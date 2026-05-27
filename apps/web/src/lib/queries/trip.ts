import { ApiResult, ID } from '@repo/shared/types/data'
import { Plan, Segment, SegmentInsert, Trip, TripInsert } from '@repo/shared/types/database'
import {
    DeletePlanBody,
    DeleteSegmentsBody,
    RenamePlanBody,
    UpdateSegmentBody,
    UpdateTripBody,
} from '@repo/shared/types/mutations'
import { fetchJSON } from '@repo/shared/utils/api'
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query'
import { keepPreviousData } from '@tanstack/react-query'

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
            
            const result = await fetchJSON<Trip>(`/api/trips/${tripId}?withDetails=true`)
            
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
            return await fetchJSON<Trip | null>('/api/trips', {
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
            return fetchJSON<Trip | null>(`/api/trips/${tripId}`, {
                method: 'PUT',
                body: JSON.stringify(tripData),
            })
        },
        onSuccess: (_data: ApiResult<Trip | null>, variables) => {
            queryClient.invalidateQueries({ queryKey: ['trip', variables.tripId] })
        },
    })
}

export const useAddSegment = (): UseMutationResult<ApiResult<Segment | null>, Error, SegmentInsert, unknown> => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (segmentData: SegmentInsert): Promise<ApiResult<Segment | null>> => {
            return fetchJSON<Segment>('/api/segments', {
                method: 'POST',
                body: JSON.stringify(segmentData),
            })
        },
        onSuccess: (data: ApiResult<Segment | null>) => {
            queryClient.invalidateQueries({ queryKey: ['trip', data?.data?.tripId] })
        },
    })
}

export const useUpdateSegment = (): UseMutationResult<Segment | null, Error, UpdateSegmentBody, unknown> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        
        mutationFn: async ({ segmentId, tripId, ...segmentData }: UpdateSegmentBody): Promise<Segment | null> => {
            const data = await fetchJSON<Segment>(`/api/segments/${segmentId}`, {
                method: 'PUT',
                body: JSON.stringify(segmentData),
            })
            
            if (!data?.data?.tripId)
                return null
            
            // Attach tripId to the response for onSettled
            return { ...data, tripId } as Segment
        },
        // Optimistic update: immediately update the cache before the server responds
        onMutate: async ({ segmentId, tripId, planId, cascadeEnabled, ...updates }) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ['trip', tripId] })
            
            // Snapshot the previous value
            const previousTrip = queryClient.getQueryData(['trip', tripId])
            
            // Optimistically update the cache
            if (previousTrip && !cascadeEnabled) {
                queryClient.setQueryData(['trip', tripId], (old: Trip | undefined) => {
                    if (!old?.plans) return old
                    
                    return {
                        ...old,
                        plans: old.plans.map(plan => {
                            if (plan.id.toString() !== planId?.toString()) return plan
                            
                            return {
                                ...plan,
                                segments: plan.segments?.map(seg => {
                                    if (seg.id !== segmentId) return seg
                                    return { ...seg, ...updates }
                                }),
                            }
                        }),
                    }
                })
            }
            
            // Return context with the snapshotted value
            return { previousTrip, tripId }
        },
        // If mutation fails, rollback to the previous value
        onError: (err, variables, context) => {
            
            console.error('useUpdateSegment', err)
            console.log('useUpdateSegment', variables)
            
            if (context?.previousTrip)
                queryClient.setQueryData(['trip', context.tripId], context.previousTrip)
            
        },
        // Always refetch after error or success to ensure server state is correct
        onSettled: (data, error, variables) => {
            
            if (error)
                console.error('useUpdateSegment', error)
            
            const tid = data?.tripId || variables?.tripId
            
            if (tid)
                queryClient.invalidateQueries({ queryKey: ['trip', tid] })
            
        },
    })
    
}

export const useDeleteSegments = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, planId, segmentIds }: DeleteSegmentsBody) => {
            return fetchJSON<Segment>('/api/segments', {
                method: 'DELETE',
                body: JSON.stringify({ tripId, planId, segmentIds }),
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['trip', data?.data?.tripId] })
        },
    })
}

/**
 * @deprecated
 */
export const useRenamePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ planId, name }: RenamePlanBody) => {
            return fetchJSON<Plan>(`/api/plans/${planId}`, {
                method: 'PUT',
                body: JSON.stringify({ name }),
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['trip', data?.data?.tripId] })
        },
    })
}

export const useDeletePlan = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ planId }: DeletePlanBody) => {
            return fetchJSON<Plan>(`/api/plans/${planId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['trip', data?.data?.tripId] })
        },
    })
    
}

export const useDeleteTripMutation = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (tripId: ID) => {
            await fetchJSON<Trip>(`/api/trips/${tripId}`, {
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
            
            const photoResult = await fetchJSON<string | null>('/api/utils/random-photo', {
                method: 'POST',
                body: JSON.stringify({ topic }),
            })
            
            if (!photoResult.data) {
                console.error('Failed to fetch new trip cover photo')
                return { data: null, error: 'Failed to fetch new trip cover photo' } as ApiResult<Trip>
            }
            
            const result = await fetchJSON<Trip | null>(`/api/trips/${tripId}`, {
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
