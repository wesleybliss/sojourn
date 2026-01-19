import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as store from '@/store'
import { updateItemArray } from '@/lib/storeUtils.js'
import { fetchJSON } from '@/lib/api'

// const idToInt = obj => obj?.id ? parseInt(obj?.id, 10) : null

export const useTripQuery = tripId => useQuery({
    queryKey: ['trip', tripId],
    queryFn: async () => {
        
        try {
            
            const { data } = await fetchJSON(`/api/trips/${tripId}?withDetails=true`)
            
            // @todo need to handle this better
            try {
                updateItemArray(store.trips, data)
                // store.currentTripId.setValue(idToInt(data))
                store.currentTripId.setValue(data.id)
            } catch (e) {
                console.warn('useTripQuery: updateItemArray failed', e)
            }
            
            return data
            
        } catch (e) {
            
            console.error('queries/trip', e)
            throw e
            
        }
        
    },
    enabled: !!tripId,
    keepPreviousData: true,
    retry: 0,
})

export const useCreateTripMutation = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async tripData => {
            const { data } = await fetchJSON('/api/trips', {
                method: 'POST',
                body: JSON.stringify(tripData),
            })
            
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['trips'])
        },
    })
    
}

export const useUpdateTrip = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, ...tripData }) => {
            return fetchJSON(`/api/trips/${tripId}`, {
                method: 'PUT',
                body: JSON.stringify(tripData),
            })
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['trip', variables.tripId])
            // queryClient.invalidateQueries(['trips'])
        },
    })
}

export const useAddSegment = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async segmentData => {
            return fetchJSON('/api/segments', {
                method: 'POST',
                body: JSON.stringify(segmentData),
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['trip', data.tripId])
        },
    })
}

export const useUpdateSegment = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        // eslint-disable-next-line no-unused-vars
        mutationFn: async ({ segmentId, tripId, planId, ...segmentData }) => {
            const json = await fetchJSON(`/api/segments/${segmentId}`, {
                method: 'PUT',
                body: JSON.stringify(segmentData),
            })
            
            // Attach tripId to the response for onSettled
            return { ...json, tripId }
        },
        // Optimistic update: immediately update the cache before the server responds
        onMutate: async ({ segmentId, tripId, planId, cascadeEnabled, ...updates }) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries(['trip', tripId])
            
            // Snapshot the previous value
            const previousTrip = queryClient.getQueryData(['trip', tripId])
            
            // Optimistically update the cache
            if (previousTrip && !cascadeEnabled) {
                queryClient.setQueryData(['trip', tripId], old => {
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
            if (context?.previousTrip) {
                queryClient.setQueryData(['trip', context.tripId], context.previousTrip)
            }
        },
        // Always refetch after error or success to ensure server state is correct
        onSettled: (data, error, variables) => {
            const tid = data?.tripId || variables?.tripId
            
            if (tid) {
                queryClient.invalidateQueries(['trip', tid])
            }
        },
    })
    
}

export const useDeleteSegments = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, planId, segmentIds }) => {
            return fetchJSON('/api/segments', {
                method: 'DELETE',
                body: JSON.stringify({ tripId, planId, segmentIds }),
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['trip', data.tripId])
        },
    })
}

/**
 * @deprecated
 * @returns {UseMutationResult<any, DefaultError, {readonly planId?: *, readonly name?: *}, unknown>}
 */
export const useRenamePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ planId, name }) => {
            return fetchJSON(`/api/plans/${planId}`, {
                method: 'PUT',
                body: JSON.stringify({ name }),
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['trip', data.tripId])
        },
    })
}

export const useDeletePlan = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ planId }) => {
            return fetchJSON(`/api/plans/${planId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['trip', data.tripId])
        },
    })
    
}

export const useDeleteTripMutation = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async tripId => {
            await fetchJSON(`/api/trips/${tripId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['trips'])
        },
    })
    
}
