import { useWire, useWireState, useWireValue } from '@forminator/react-wire'
import { ApiResult, CreateTripBody, ID, Trip, TripWithSegmentCount } from '@repo/shared/types'
import { QueryObserverResult, RefetchOptions, UseMutationResult } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useCreateTripMutation, useDeleteTripMutation, useShuffleTripCoverPhoto } from '@/lib/queries/trip'
import { useTripsQuery } from '@/lib/queries/trips'
import { useRouter } from '@/lib/router'
import * as store from '@/store'

type TripListItem = Trip | TripWithSegmentCount

type TTripsPageViewModel = {
    // State
    isDeletingTrip: boolean
    
    // Queries
    trips: TripListItem[]
    tripsError: Error | null
    tripsLoading: boolean
    tripsRefetch: (options?: RefetchOptions | undefined) => Promise<
        QueryObserverResult<TripListItem[] | null | undefined, Error>>
    
    // Mutations
    createTripMutation: UseMutationResult<ApiResult<Trip | null>, Error, CreateTripBody, unknown>
    deleteTripMutation: UseMutationResult<void, Error, number, unknown>
    
    // Methods
    onCreateTripClick: () => void
    handleDeleteTrip: () => Promise<void>
    navigateToImportTrips: () => void
    handleTripClick: (tripId: ID) => void
}

const TripsPageViewModel = (): TTripsPageViewModel => {
    
    const isUpdatingCoverImagesRef = useRef<{
        value: boolean
        count: number
    }>({ value: false, count: 0 })
    
    const router = useRouter()
    
    // @todo @debug
    const currentTeam = useWireValue(store.currentTeam)
    
    const trips = useWireValue(store.trips)
    const createTripDialogOpen = useWire(store.createTripDialogOpen)
    const [deleteTripDialogId, setDeleteTripDialogId] = useWireState(store.deleteTripDialogId)
    
    const [isDeletingTrip, setIsDeletingTrip] = useState(false)
    
    /*const [isUpdatingCoverImages, setIsUpdatingCoverImages] = useState<{
        value: boolean
        count: number
    }>({ value: false, count: 0 })*/
    
    const {
        // data: trips,
        error: tripsError,
        isLoading: tripsLoading,
        refetch: tripsRefetch,
    } = useTripsQuery({
        withCounts: true,
        withDetails: true,
    })
    
    const createTripMutation = useCreateTripMutation()
    const deleteTripMutation = useDeleteTripMutation()
    const shuffleTripCoverPhotoMutation = useShuffleTripCoverPhoto()
    
    const onCreateTripClick = () => {
        createTripDialogOpen.setValue(true)
    }
    
    const handleDeleteTrip = useCallback(async () => {
        
        setIsDeletingTrip(true)
        
        try {
            
            if (!deleteTripDialogId)
                return console.warn('handleDeleteTrip: no deleteTripDialogId set')
            
            await deleteTripMutation.mutateAsync(deleteTripDialogId)
            
            toast.success('Trip deleted successfully')
            
        } catch (e) {
            
            console.error('Error deleting trip:', e)
            toast.error('Failed to delete trip')
            
        }
        
        setIsDeletingTrip(false)
        setDeleteTripDialogId(null)
        
    }, [deleteTripDialogId])
    
    const navigateToImportTrips = () =>
        router.push('/trips/import')
    
    const handleTripClick = (tripId: ID) =>
        router.push(`/trips/${tripId}`)
    
    useEffect(() => {
        
        if (!trips?.length || isUpdatingCoverImagesRef.current.value || isUpdatingCoverImagesRef.current.count > 3)
            return
        
        isUpdatingCoverImagesRef.current = {
            value: true,
            count: isUpdatingCoverImagesRef.current.count + 1,
        }
        
        const tripsMissingCoverImage = trips.filter(it => !it.coverImageUrl?.length)
        
        if (!tripsMissingCoverImage.length) {
            isUpdatingCoverImagesRef.current = { value: false, count: 0 }
            return
        }
        
        const promises = tripsMissingCoverImage.map(it => {
            return shuffleTripCoverPhotoMutation.mutateAsync({
                tripId: it.id,
                topic: it.name,
            })
        })
        
        Promise.all(promises)
            .catch(e => console.error('Failed to update cover images', e))
            .finally(() => {
                isUpdatingCoverImagesRef.current = { value: false, count: 0 }
            })
        
    }, [isUpdatingCoverImagesRef, shuffleTripCoverPhotoMutation, trips])
    
    return {
        
        currentTeam,
        
        // State
        isDeletingTrip,
        
        // Queries
        trips: (trips as TripListItem[]) ?? [],
        tripsError,
        tripsLoading,
        tripsRefetch,
        
        // Mutations
        createTripMutation,
        deleteTripMutation,
        
        // Methods
        onCreateTripClick,
        handleDeleteTrip,
        navigateToImportTrips,
        handleTripClick,
        
    }
    
}

export default TripsPageViewModel
