import { ApiResult, ID, Trip, TripInsert, TripWithSegmentCount } from '@repo/shared/types'
import { QueryObserverResult, RefetchOptions, UseMutationResult } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useEffect, useState } from 'react'

import { useCreateTripMutation, useDeleteTripMutation, useShuffleTripCoverPhoto } from '@/lib/queries/trip'
import { useTripsQuery } from '@/lib/queries/trips'

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
    onDeleteTripClick: (id: ID) => (e: SyntheticEvent) => Promise<void>
    navigateToImportTrips: () => void
    handleTripClick: (tripId: ID) => void
}

const TripsPageViewModel = (): TTripsPageViewModel => {
    
    const router = useRouter()
    
    const [isUpdatingCoverImages, setIsUpdatingCoverImages] = useState(false)
    
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
            
            // setTrips(prevTrips => [...prevTrips, newTrip])
            await tripsRefetch()
            
            const newTrip = result.data
            
            if (newTrip)
                router.push(`/trips/${newTrip.id}`)
            
        } catch (e) {
            
            console.error('Error creating trip:', e)
            
        }
        
    }
    
    const onDeleteTripClick = (id: ID) => async (e: SyntheticEvent) => {
        
        e.preventDefault()
        e.stopPropagation()
        
        if (!confirm('Are you sure you want to delete this trip?'))
            return
        
        try {
            await deleteTripMutation.mutateAsync(id)
            // setTrips(prevTrips => prevTrips.filter(trip => trip.id !== id))
            await tripsRefetch()
        } catch (error) {
            console.error('Error deleting trip:', error)
        }
        
    }
    
    const navigateToImportTrips = () =>
        router.push('/import-trips')
    
    const handleTripClick = (tripId: ID) =>
        router.push(`/trips/${tripId}`)
    
    useEffect(() => {
        
        if (!trips?.length || isUpdatingCoverImages) return
        
        setIsUpdatingCoverImages(true)
        
        const tripsMissingCoverImage = trips.filter(it => !it.coverImageUrl?.length)
        
        if (!tripsMissingCoverImage.length) {
            setIsUpdatingCoverImages(false)
            return
        }
        
        const promises = tripsMissingCoverImage.map(it => {
            return shuffleTripCoverPhotoMutation.mutateAsync({ tripId: it.id, topic: it.name })
        })
        
        Promise.all(promises)
            .catch(e => console.error('Failed to update cover images', e))
            .finally(() => setIsUpdatingCoverImages(false))
        
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
        onDeleteTripClick,
        navigateToImportTrips,
        handleTripClick,
        
    }
    
}

export default TripsPageViewModel
