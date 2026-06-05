import { useWireState } from '@forminator/react-wire'
import { ApiResult, ID, Trip, TripInsert, TripWithSegmentCount } from '@repo/shared/types'
import { QueryObserverResult, RefetchOptions, UseMutationResult } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useCreateTripMutation, useDeleteTripMutation, useShuffleTripCoverPhoto } from '@/lib/queries/trip'
import { useTripsQuery } from '@/lib/queries/trips'
import { useRouter } from '@/lib/router'
import * as store from '@/store'

type TripListItem = Trip | TripWithSegmentCount

type TTripsPageViewModel = {
    // Queries
    trips: TripListItem[]
    tripsError: Error | null
    tripsLoading: boolean
    tripsRefetch: (options?: RefetchOptions | undefined) => Promise<
        QueryObserverResult<TripListItem[] | null | undefined, Error>>
    
    // Mutations
    createTripMutation: UseMutationResult<ApiResult<Trip | null>, Error, Partial<TripInsert>, unknown>
    deleteTripMutation: UseMutationResult<void, Error, number, unknown>
    
    // Methods
    createNewTrip: () => Promise<void>
    handleDeleteTrip: () => Promise<void>
    navigateToImportTrips: () => void
    handleTripClick: (tripId: ID) => void
}

const TripsPageViewModel = (): TTripsPageViewModel => {
    
    const router = useRouter()
    
    const [deleteTripDialogId, setDeleteTripDialogId] = useWireState(store.deleteTripDialogId)
    
    const [isUpdatingCoverImages, setIsUpdatingCoverImages] = useState<{
        value: boolean
        count: number
    }>({ value: false, count: 0 })
    
    const {
        data: trips,
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
    
    const createNewTrip = async () => {
        
        try {
            
            const result = await createTripMutation.mutateAsync({
                name: 'New Trip',
                description: '',
                /*startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],*/
            })
            
            const newTrip = result.data
            
            if (newTrip)
                router.push(`/trips/${newTrip.id}`)
            
        } catch (e) {
            
            console.error('Error creating trip:', e)
            
        }
        
    }
    
    const handleDeleteTrip = useCallback(async () => {
        
        try {
            
            if (!deleteTripDialogId)
                return console.warn('handleDeleteTrip: no deleteTripDialogId set')
            
            await deleteTripMutation.mutateAsync(deleteTripDialogId)
            
            toast.success('Trip deleted successfully')
            
        } catch (e) {
            
            console.error('Error deleting trip:', e)
            toast.error('Failed to delete trip')
            
        }
        
        setDeleteTripDialogId(null)
        
    }, [deleteTripDialogId])
    
    const navigateToImportTrips = () =>
        router.push('/import-trips')
    
    const handleTripClick = (tripId: ID) =>
        router.push(`/trips/${tripId}`)
    
    useEffect(() => {
        
        if (!trips?.length || isUpdatingCoverImages || isUpdatingCoverImages.count > 3)
            return
        
        setIsUpdatingCoverImages(prev => ({
            value: true,
            count: prev.count + 1,
        }))
        
        const tripsMissingCoverImage = trips.filter(it => !it.coverImageUrl?.length)
        
        if (!tripsMissingCoverImage.length) {
            setIsUpdatingCoverImages({ value: false, count: 0 })
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
            .finally(() => setIsUpdatingCoverImages({ value: false, count: 0 }))
        
    }, [isUpdatingCoverImages, shuffleTripCoverPhotoMutation, trips])
    
    return {
        
        // Queries
        trips: (trips as TripListItem[]) ?? [],
        tripsError,
        tripsLoading,
        tripsRefetch,
        
        // Mutations
        createTripMutation,
        deleteTripMutation,
        
        // Methods
        createNewTrip,
        handleDeleteTrip,
        navigateToImportTrips,
        handleTripClick,
        
    }
    
}

export default TripsPageViewModel
