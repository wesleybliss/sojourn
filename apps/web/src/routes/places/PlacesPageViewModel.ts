import { ApiResult } from '@repo/shared/types'
import { Place, Trip } from '@repo/shared/types/database'
import { UseMutationResult } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { toast } from 'sonner'

import {
    CreatePlaceBody,
    ExtendedUpdatePlaceBody,
    useCreatePlace,
    usePlacesQuery,
    useUpdatePlace,
} from '@/lib/queries/places'
import { useTripsQuery } from '@/lib/queries/trips'

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

export const sectionClasses = [
    'bg-[linear-gradient(135deg,_rgba(233,238,243,1)_0%,_rgba(247,249,251,1)_55%,_rgba(216,226,238,0.85)_100%)]',
    'dark:bg-[linear-gradient(135deg,_rgba(32,49,73,0.9)_0%,_rgba(17,28,45,1)_55%,_rgba(42,61,87,0.7)_100%)]',
]

export type TPlacesPageViewModel = {
    // State
    search: string
    setSearch: Dispatch<SetStateAction<string>>
    activeRegion: string // @todo custom type
    setActiveRegion: Dispatch<SetStateAction<string>>
    addPlaceDialogOpen: boolean
    setAddPlaceDialogOpen: Dispatch<SetStateAction<boolean>>
    
    // Memos
    trips: Trip[]
    places: PlaceRecord[]
    recentSegments: RecentSegment[]
    regionFilters: string[]
    
    // Queries
    isLoading: boolean
    placesData: Place[] | null | undefined
    tripsData: Trip[] | null | undefined
    
    // @todo
    /*tripsError: Error | null
    tripsLoading: boolean
    tripsRefetch: () => Promise<void>*/
    
    // Mutations
    updatePlace: UseMutationResult<ApiResult<Place | null>, Error, ExtendedUpdatePlaceBody, unknown>
    createPlace: UseMutationResult<ApiResult<Place | null>, Error, CreatePlaceBody, unknown>
    
    // Methods
    getSegmentCountForPlace: (place: PlaceRecord) => number
    filteredPlaces: PlaceRecord[]
    handleCreatePlace: (name: string) => Promise<void>
    toggleBookmark: (place: PlaceRecord) => Promise<void>
}

const usePlacesPageViewModel = (): TPlacesPageViewModel => {
    
    const [search, setSearch] = useState('')
    const [activeRegion, setActiveRegion] = useState('All')
    const [addPlaceDialogOpen, setAddPlaceDialogOpen] = useState(false)
    
    const { data: placesData, isLoading } = usePlacesQuery()
    const { data: tripsData } = useTripsQuery({
        withDetails: true,
    })
    
    const updatePlace = useUpdatePlace()
    const createPlace = useCreatePlace()
    
    const trips = useMemo(() => (tripsData || []) as Trip[], [tripsData])
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
    
    const handleCreatePlace = async (name: string) => {
        
        try {
            
            await createPlace.mutateAsync({
                name,
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
        
        // State
        search,
        setSearch,
        activeRegion,
        setActiveRegion,
        addPlaceDialogOpen,
        setAddPlaceDialogOpen,
        
        // Memos
        trips,
        places,
        recentSegments,
        regionFilters,
        
        // Queries
        isLoading,
        placesData,
        tripsData,
        
        // @todo
        /*tripsError,
        tripsLoading,
        tripsRefetch,*/
        
        // Mutations
        updatePlace,
        createPlace,
        
        // Methods
        getSegmentCountForPlace,
        filteredPlaces,
        handleCreatePlace,
        toggleBookmark,
        
    }
    
}

export default usePlacesPageViewModel
