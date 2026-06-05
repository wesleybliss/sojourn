import { fetchJSON } from '@repo/shared/utils/api'
import { ApiResult, ID } from '@shared/types/data.types'
import { Trip } from '@shared/types/database.types'
import { CreateTripBody, UpdateTripBody } from '@shared/types/mutations.types'
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

export const useCreateTripMutation = (): UseMutationResult<ApiResult<Trip | null>, Error, CreateTripBody, unknown> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (tripData: CreateTripBody) => {
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
        mutationFn: async ({ id, ...tripData }: UpdateTripBody) => {
            return fetchJSON<Trip | null>(`trips/${id}`, {
                method: 'PUT',
                body: JSON.stringify(tripData),
            })
        },
        onSuccess: (_data: ApiResult<Trip | null>, variables) => {
            queryClient.invalidateQueries({ queryKey: ['trip', variables.id] })
        },
        retry: 1,
        retryDelay: 3_000,
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
    ShuffleTripCoverPhotoBody
> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, topic }: ShuffleTripCoverPhotoBody) => {
            
            const photoResult = await fetchJSON<ApiResult<string | null>>('utils/random-photo', {
                method: 'POST',
                body: JSON.stringify({ topic }),
            })
            
            if (!photoResult.data?.data) {
                console.error('Failed to fetch new trip cover photo')
                return { data: null, error: 'Failed to fetch new trip cover photo' } as ApiResult<Trip>
            }
            
            const result = await fetchJSON<Trip | null>(`trips/${tripId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    coverImageUrl: photoResult.data.data,
                }),
            })
            
            if (result.data)
                updateItemArray(store.trips, result.data)
            
            return result
            
        },
        onSuccess: (result: ApiResult<Trip | null>, variables) => {
            console.log('useShuffleTripCoverPhoto', result)
            queryClient.invalidateQueries({ queryKey: ['trip', variables.tripId] })
        },
        retry: 1,
        retryDelay: 3_000,
    })
    
}
