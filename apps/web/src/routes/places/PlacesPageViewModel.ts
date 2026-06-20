import { useWireState, useWireValue } from '@forminator/react-wire'
import { ApiResult, DeletePlacesBody, GeonamesCity, ID, ListViewMode, PlaceInsert } from '@repo/shared/types'
import { Place, Trip } from '@shared/types/database.types'
import { UseMutationResult } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'

import useCheckItems from '@/hooks/useCheckItems'
import {
    ExtendedUpdatePlaceBody,
    useCreatePlace, useDeletePlaces,
    usePlacesQuery,
    useUpdatePlace,
} from '@/lib/queries/places'
import * as store from '@/store'

export type PlaceRecord = Place & {
    focus?: string | null
    quickTip?: string | null
    personalNotes?: string | null
    region?: string | null
    travelWindow?: string | null
    isBookmarked?: boolean
}

export type RecentSegment = {
    id: string
    tripName: string
    segmentName: string
    updatedAt: Date
    dateRange: string
}

export const defaultRegions = ['All', 'Europe', 'Asia', 'Americas']

export type TPlacesPageViewModel = {
    // Global State
    placesListViewMode: ListViewMode
    setPlacesListViewMode: Dispatch<SetStateAction<ListViewMode>>
    createPlaceDialogOpen: boolean
    setCreatePlaceDialogOpen: Dispatch<SetStateAction<boolean>>
    deletePlacesDialogOpen: boolean
    setDeletePlacesDialogOpen: Dispatch<SetStateAction<boolean>>
    
    // State
    search: string
    setSearch: Dispatch<SetStateAction<string>>
    activeRegion: string // @todo custom type
    setActiveRegion: Dispatch<SetStateAction<string>>
    
    // Memos
    trips: Trip[]
    places: PlaceRecord[]
    recentSegments: RecentSegment[]
    regionFilters: string[]
    
    // Queries
    isLoading: boolean
    placesData: Place[] | null | undefined
    
    // @todo
    /*tripsError: Error | null
    tripsLoading: boolean
    tripsRefetch: () => Promise<void>*/
    
    // Mutations
    updatePlace: UseMutationResult<ApiResult<Place | null>, Error, ExtendedUpdatePlaceBody, unknown>
    createPlace: UseMutationResult<ApiResult<Place | null>, Error, PlaceInsert, unknown>
    deletePlacesMutation: UseMutationResult<ApiResult<Place | null>, Error, DeletePlacesBody, unknown>
    
    // Hooks
    hasChecked: (idOrIds: (ID | ID[])) => boolean
    allChecked: boolean
    anyChecked: boolean
    toggleChecked: (idOrIds: (ID | ID[])) => void
    toggleAllChecked: (forceAll?: boolean) => void
    
    // Methods
    getSegmentCountForPlace: (place: PlaceRecord) => number
    filteredPlaces: PlaceRecord[]
    handleCreatePlace: (item: GeonamesCity) => Promise<void>
    handleDeletePlaces: () => Promise<void>
    toggleBookmark: (place: PlaceRecord) => Promise<void>
}

const usePlacesPageViewModel = (): TPlacesPageViewModel => {
    
    const currentTeamId = useWireValue(store.currentTeamId)
    const trips = useWireValue(store.trips)
    const [placesListViewMode, setPlacesListViewMode] = useWireState(store.placesListViewMode)
    const [createPlaceDialogOpen, setCreatePlaceDialogOpen] = useWireState(store.createPlaceDialogOpen)
    const [deletePlacesDialogOpen, setDeletePlacesDialogOpen] = useWireState(store.deletePlacesDialogOpen)
    
    const [search, setSearch] = useState('')
    const [activeRegion, setActiveRegion] = useState('All')
    
    const { data: placesData, isLoading } = usePlacesQuery(currentTeamId)
    
    const updatePlace = useUpdatePlace(currentTeamId)
    const createPlace = useCreatePlace(currentTeamId)
    const deletePlacesMutation = useDeletePlaces(currentTeamId)
    
    const places = useMemo(() => (placesData || []) as PlaceRecord[], [placesData])
    
    const recentSegments: RecentSegment[] = useMemo(() => {
        
        return trips
            .flatMap(trip => (trip.plans || []).flatMap(plan => (plan.segments || []).map(segment => ({
                id: `${trip.id}-${segment.id}`,
                tripName: trip.name,
                segmentName: segment.name,
                updatedAt: segment.updatedAt as Date,
                dateRange: `${dayjs(segment.startDate as Date)
                    .format('MMM D')} - ${dayjs(segment.endDate as Date).format('MMM D')}`,
            }))))
            .sort((a, b) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf())
        
    }, [trips])
    
    const regionFilters: string[] = useMemo(() => {
        
        const dynamicRegions = places
            .map(place => place.region)
            .filter((region): region is string => Boolean(region?.length))
            .filter((region, index, arr) => arr.indexOf(region) === index)
        
        return Array.from(new Set([...defaultRegions, ...dynamicRegions]))
        
    }, [places])
    
    const getSegmentCountForPlace = (place: PlaceRecord) => recentSegments.filter(segment => {
        
        const query = place.name.toLowerCase()
        
        return segment.segmentName.toLowerCase().includes(query)
            || segment.tripName.toLowerCase().includes(query)
        
    }).length
    
    const filteredPlaces = useMemo(() => places.filter(place => {
        
        const query = search.trim().toLowerCase()
        
        const matchesSearch = !query || [
            place.name,
            place.focus,
            place.quickTip,
            place.personalNotes,
            place.region,
        ].some(value => value?.toLowerCase().includes(query))
        
        const matchesRegion = activeRegion === 'All' || place.region === activeRegion
        
        return matchesSearch && matchesRegion
        
    }), [activeRegion, places, search])
    
    const {
        checked,
        hasChecked,
        allChecked,
        anyChecked,
        toggleChecked,
        toggleAllChecked,
    } = useCheckItems(filteredPlaces)
    
    const handleCreatePlace = async (item: GeonamesCity) => {
        
        try {
            
            if (!currentTeamId)
                throw new Error('No current team selected')
            
            await createPlace.mutateAsync({
                teamId: currentTeamId,
                geonamesCityId: item.id,
                name: item.name,
                region: activeRegion === 'All' ? 'Unassigned' : activeRegion,
                focus: 'Add a destination focus',
                quickTip: 'Capture the one thing future-you should remember.',
                personalNotes: 'Use this card as a planning scratchpad.',
                travelWindow: dayjs().add(3, 'month').format('MMM YYYY'),
                isBookmarked: true,
            })
            
            toast.success('Place created')
            
        } catch (e) {
            
            console.error('PlacesPage.handleCreatePlace', e)
            toast.error('Failed to create place')
            
        }
        
    }
    
    const handleDeletePlaces = useCallback(async () => {
        
        try {
            
            await deletePlacesMutation.mutateAsync({ placeIds: Array.from(checked) })
            toast.success('Places deleted successfully')
            
        } catch (e) {
            
            console.error('Error deleting places:', e)
            toast.error('Failed to delete places')
            
        }
        
        setDeletePlacesDialogOpen(false)
        
    }, [deletePlacesMutation, checked])
    
    const toggleBookmark = async (place: PlaceRecord) => {
        
        try {
            
            await updatePlace.mutateAsync({
                id: place.id,
                isBookmarked: !place.isBookmarked,
            })
            
        } catch (e) {
            
            console.error('PlacesPage.toggleBookmark', e)
            toast.error('Failed to update bookmark')
            
        }
        
    }
    
    return {
        
        // Global State
        placesListViewMode,
        setPlacesListViewMode,
        createPlaceDialogOpen,
        setCreatePlaceDialogOpen,
        deletePlacesDialogOpen,
        setDeletePlacesDialogOpen,
        
        // State
        search,
        setSearch,
        activeRegion,
        setActiveRegion,
        
        // Memos
        trips,
        places,
        recentSegments,
        regionFilters,
        
        // Queries
        isLoading,
        placesData,
        
        // @todo
        /*tripsError,
        tripsLoading,
        tripsRefetch,*/
        
        // Mutations
        updatePlace,
        createPlace,
        deletePlacesMutation,
        
        // Hooks
        hasChecked,
        allChecked,
        anyChecked,
        toggleChecked,
        toggleAllChecked,
        
        // Methods
        getSegmentCountForPlace,
        filteredPlaces,
        handleCreatePlace,
        handleDeletePlaces,
        toggleBookmark,
        
    }
    
}

export default usePlacesPageViewModel
