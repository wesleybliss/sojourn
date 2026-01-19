import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchJSON } from '@/lib/api'
/* import * as store from '@/store'
import { updateItemArray } from '@/lib/storeUtils.js' */

const plansQueryKey = (tripId, exclusive = false) =>
    exclusive ? [tripId] : ['trips', tripId, 'plans']

export const usePlansQuery = (tripId, opts = {}) => useQuery({
    queryKey: plansQueryKey(tripId),
    queryFn: () => fetchJSON(`/api/trips/${tripId}/plans`),
    enabled: !!tripId,
    keepPreviousData: true,
    ...opts,
})

export const usePlanQuery = (planId, opts = {}) => useQuery({
    queryKey: ['plans', planId],
    queryFn: () => fetchJSON(`/api/plans/${planId}`),
    enabled: !!planId,
    keepPreviousData: true,
    ...opts,
})

export const useCreatePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, ...planData }) => {
            return fetchJSON('/api/plans', {
                method: 'POST',
                body: JSON.stringify({ tripId, ...planData }),
            })
        },
        onSuccess: (data, variables) => {
            // queryClient.invalidateQueries({ queryKey: plansQueryKey(variables.tripId) })
            queryClient.invalidateQueries(['trip', variables.tripId])
        },
    })
}

export const useUpdatePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ /* tripId, */ planId, ...planData }) => {
            return fetchJSON(`/api/plans/${planId}`, {
                method: 'PUT',
                body: JSON.stringify(planData),
            })
        },
        onSuccess: (data, variables) => {
            try {
                console.log('invalidateQueries', { variables, queryKey: plansQueryKey(variables.tripId, true) })
            } catch (e) {
                console.error('ehh', e)
            }
            
            queryClient.invalidateQueries(['trip', ...plansQueryKey(variables.tripId, true)])
            /* queryClient.invalidateQueries({ queryKey: ['plans', variables.id] })
            queryClient.invalidateQueries({ queryKey: ['trips', variables.tripId] }) */
        },
    })
}

export const useDeletePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async plan => {
            return fetchJSON(`/api/plans/${plan.id}`, {
                method: 'DELETE',
            })
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['trip', variables.tripId])
        },
    })
}

export const useClonePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ planId }) => {
            return fetchJSON(`/api/plans/${planId}/clone`, {
                method: 'POST',
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['trip', data.tripId])
        },
    })
}
