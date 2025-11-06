import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import plansRepo from '@/db/repos/plans'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

const plansQueryKey = (tripId, exclusive = false) =>
    exclusive ? [tripId] : ['trips', tripId, 'plans']

export const usePlansQuery = (tripId, opts = {}) => useQuery({
    queryKey: plansQueryKey(tripId),
    queryFn: async () => {
        const plans = await plansRepo.findAllByTripId(tripId)
        
        return plans
    },
    enabled: !!tripId,
    ...opts,
})

export const usePlanQuery = (planId, opts = {}) => useQuery({
    queryKey: ['plans', planId],
    queryFn: async () => {
        const plan = await plansRepo.findOneById(planId)
        
        if (!plan) throw new Error('Plan not found')
        return plan
    },
    enabled: !!planId,
    ...opts,
})

export const useCreatePlan = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async ({ tripId, ...planData }) => {
            const newPlan = await plansRepo.create({ tripId, ...planData })
            
            return newPlan
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries(['trip', variables.tripId])
            
            if (online) {
            }
        },
    })
}

export const useUpdatePlan = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async ({ planId, ...planData }) => {
            const updated = await plansRepo.updateById(planId, planData)
            
            return updated
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries(['trip', ...plansQueryKey(variables.tripId, true)])
            
            if (online) {
            }
        },
    })
}

export const useDeletePlan = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async plan => {
            await plansRepo.deleteById(plan.id)
            return plan
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries(['trip', variables.tripId])
            
            if (online) {
            }
        },
    })
}

export const useClonePlan = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async () => {
            // Need to implement clone in plansRepo
            // For now, throw error
            throw new Error('Clone plan not yet implemented in local-first mode')
        },
        onSuccess: async data => {
            await queryClient.invalidateQueries(['trip', data.tripId])
            
            if (online) {
            }
        },
    })
}
