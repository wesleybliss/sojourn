import { useRouter } from 'next/navigation'
import { useCreateTripMutation, useDeleteTripMutation } from '@/lib/queries/trip'
import { useTripsQuery } from '@/lib/queries/trips'
import { ID, Trip, TripInsert } from '@repo/shared/types'
import { QueryObserverResult, RefetchOptions, UseMutationResult } from '@tanstack/react-query'

type TTripsPageViewModel = {
    // Queries
    trips: Trip[]
    tripsError: Error | null
    tripsLoading: boolean
    tripsRefetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
    
    // Mutations
    createTripMutation: UseMutationResult<Trip, Error, Partial<TripInsert>, unknown>
    deleteTripMutation: UseMutationResult<void, Error, number, unknown>
    
    // Methods
    createNewTrip: () => Promise<void>
    onDeleteTripClick: (id: ID) => (e: MouseEvent) => Promise<void>
    navigateToImportTrips: () => void
    handleTripClick: (tripId: ID) => void
}

const TripsPageViewModel = (): TTripsPageViewModel => {
    
    const router = useRouter()
    
    const {
        data: trips,
        error: tripsError,
        isLoading: tripsLoading,
        refetch: tripsRefetch,
    } = useTripsQuery()
    
    const createTripMutation = useCreateTripMutation()
    const deleteTripMutation = useDeleteTripMutation()
    
    const createNewTrip = async () => {
        
        try {
            
            const newTrip = await createTripMutation.mutateAsync({
                name: 'New Trip',
                description: '',
                /*startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],*/
            })
            
            // setTrips(prevTrips => [...prevTrips, newTrip])
            await tripsRefetch()
            
            router.push(`/trips/${newTrip.id}`)
            
        } catch (e) {
            
            console.error('Error creating trip:', e)
            
        }
        
    }
    
    const onDeleteTripClick = (id: ID) => async (e: MouseEvent) => {
        
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
    
    return {
        
        // Queries
        trips,
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
