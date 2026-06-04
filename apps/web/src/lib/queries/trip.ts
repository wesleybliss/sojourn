import { ApiResult, ID } from '@repo/shared/types/data'
import { Trip, TripInsert } from '@repo/shared/types/database'
import { UpdateTripBody } from '@repo/shared/types/mutations'
import { fetchJSON } from '@repo/shared/utils/api'
import { keepPreviousData, useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query'

import { updateItemArray } from '@/lib/storeUtils'
import * as store from '@/store'

type ShuffleTripCoverPhotoBody = {
    tripId: ID
    topic: string
}

export const useTripQuery = (tripId: ID) => useQuery({
    queryKey: ['trip', tripId],
    queryFn: async () => {
        
        try {
            
            const result = await fetchJSON<Trip>(`trips/${tripId}?withDetails=true`)
            
            // @todo need to handle this better
            if (result.data !== null)
                try {
                    updateItemArray<Trip, Trip[]>(store.trips, result.data!)
                    // store.currentTripId.setValue(idToInt(data))
                    store.currentTripId.setValue(result.data!.id)
                } catch (e) {
                    console.warn('useTripQuery: updateItemArray failed', e)
                }
            
            return result.data
            
        } catch (e) {
            
            console.error('queries/trip', e)
            throw e
            
        }
        
    },
    enabled: !!tripId,
    placeholderData: keepPreviousData,
    retry: 0,
})

export const useCreateTripMutation = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (tripData: Partial<TripInsert>) => {
            return await fetchJSON<Trip | null>('trips', {
                method: 'POST',
                body: JSON.stringify(tripData),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] })
        },
    })
    
}

export const useUpdateTrip = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, ...tripData }: UpdateTripBody) => {
            return fetchJSON<Trip | null>(`trips/${tripId}`, {
                method: 'PUT',
                body: JSON.stringify(tripData),
            })
        },
        onSuccess: (_data: ApiResult<Trip | null>, variables) => {
            queryClient.invalidateQueries({ queryKey: ['trip', variables.tripId] })
        },
    })
    
}

export const useDeleteTripMutation = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (tripId: ID) => {
            await fetchJSON<Trip>(`trips/${tripId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] })
        },
    })
    
}

export const useShuffleTripCoverPhoto = (): UseMutationResult<
    ApiResult<Trip | null>,
    Error,
    ShuffleTripCoverPhotoBody,
    unknown
> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, topic }: ShuffleTripCoverPhotoBody) => {
            
            console.log('useShuffleTripCoverPhoto.mutate', { tripId, topic })
            
            const photoResult = await fetchJSON<string | null>('utils/random-photo', {
                method: 'POST',
                body: JSON.stringify({ topic }),
            })
            
            if (!photoResult.data) {
                console.error('Failed to fetch new trip cover photo')
                return { data: null, error: 'Failed to fetch new trip cover photo' } as ApiResult<Trip>
            }
            
            const result = await fetchJSON<Trip | null>(`trips/${tripId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    coverImageUrl: photoResult.data,
                }),
            })
            
            if (result.data)
                updateItemArray(store.trips, result.data)
            
            return result
            
        },
        onSuccess: (result: ApiResult<Trip | null>, variables) => {
            console.log('useShufflePlaceCoverPhoto', result)
            queryClient.invalidateQueries({ queryKey: ['trip', variables.tripId] })
        },
    })
    
}
