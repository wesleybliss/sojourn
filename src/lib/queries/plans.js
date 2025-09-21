import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as store from '@/store'
import { updateItemArray } from '@/lib/storeUtils.js'

const plansQueryKey = (tripId, exclusive = false) =>
    exclusive ? [tripId] : ['trips', tripId, 'plans']

export const usePlansQuery = (tripId, opts = {}) => useQuery({
    queryKey: plansQueryKey(tripId),
    queryFn: async () => {
        const response = await fetch(`/api/trips/${tripId}/plans`)
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            
            throw new Error(error.message || 'Failed to fetch plans')
        }
        
        return response.json()
    },
    enabled: !!tripId,
    ...opts,
})

export const usePlanQuery = (planId, opts = {}) => useQuery({
    queryKey: ['plans', planId],
    queryFn: async () => {
        const response = await fetch(`/api/plans/${planId}`)
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            
            throw new Error(error.message || 'Failed to fetch plan')
        }
        
        return response.json()
    },
    enabled: !!planId,
    ...opts,
})

export const useCreatePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, ...planData }) => {
            const response = await fetch(`/api/trips/${tripId}/plans`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planData),
            })
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}))
                
                throw new Error(error.message || 'Failed to create plan')
            }
            
            return response.json()
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: plansQueryKey(variables.tripId) })
            queryClient.invalidateQueries({ queryKey: ['trips', variables.tripId] })
        },
    })
}

export const useUpdatePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, planId, ...planData }) => {
            const response = await fetch(`/api/plans/${planId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planData),
            })
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}))
                
                throw new Error(error.message || 'Failed to update plan')
            }
            
            return response.json()
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
            const response = await fetch(`/api/plans/${plan.id}`, {
                method: 'DELETE',
            })
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}))
                
                throw new Error(error.message || 'Failed to delete plan')
            }
            
            return plan
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: plansQueryKey(variables.tripId) })
            queryClient.invalidateQueries({ queryKey: ['plans', variables.id] })
            queryClient.invalidateQueries({ queryKey: ['trips', variables.tripId] })
        },
    })
}
