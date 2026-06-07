import {
    ApiResult,
    DeleteSegmentBody,
    DeleteSegmentsBody,
    Segment,
    SegmentInsert,
    Trip,
    UpdateSegmentBody,
} from '@repo/shared/types'
import { fetchJSON } from '@repo/shared/utils/api'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useCreateSegment = (): UseMutationResult<ApiResult<Segment | null>, Error, SegmentInsert, unknown> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, planId, ...segmentData }: SegmentInsert): Promise<ApiResult<Segment | null>> => {
            return fetchJSON<Segment>(`trips/${tripId}/plans/${planId}/segments`, {
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
        
        mutationFn: async ({
            tripId,
            planId,
            segmentId,
            ...segmentData
        }: UpdateSegmentBody): Promise<Segment | null> => {
            
            const data = await fetchJSON<Segment>(`trips/${tripId}/plans/${planId}/segments/${segmentId}`, {
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

export const useDeleteSegment = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, planId, segmentId }: DeleteSegmentBody) => {
            return fetchJSON<Segment>(`trips/${tripId}/plans/${planId}/segments/${segmentId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['trip', data?.data?.tripId] })
        },
    })
    
}

export const useDeleteSegments = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, planId, segmentIds }: DeleteSegmentsBody) => {
            return fetchJSON<Segment>(`trips/${tripId}/plans/${planId}/segments`, {
                method: 'DELETE',
                body: JSON.stringify({ segmentIds }),
            })
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['trip', variables.tripId] })
        },
    })
    
}
