import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchJSON } from '@repo/shared/utils/api'
import { ID } from '@repo/shared/types/data'
import { Plan, PlanInsert } from '@repo/shared/types/database'
import { keepPreviousData } from '@tanstack/react-query'
import { ClonePlanBody, CreatePlanBody, UpdatePlanBody } from '@repo/shared/types/mutations'
/* import * as store from '@/store'
import { updateItemArray } from '@repo/shared/utils/storeUtils' */

const plansQueryKey = (tripId: ID, exclusive = false) =>
    exclusive ? [tripId] : ['trips', tripId, 'plans']

export const usePlansQuery = (tripId: ID, opts = {}) => useQuery({
    queryKey: plansQueryKey(tripId),
    queryFn: () => fetchJSON(`/api/trips/${tripId}/plans`),
    enabled: !!tripId,
    placeholderData: keepPreviousData,
    ...opts,
})

export const usePlanQuery = (planId: ID, opts = {}) => useQuery({
    queryKey: ['plans', planId],
    queryFn: () => fetchJSON(`/api/plans/${planId}`),
    enabled: !!planId,
    placeholderData: keepPreviousData,
    ...opts,
})

export const useCreatePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, ...planData }: CreatePlanBody) => {
            return fetchJSON('/api/plans', {
                method: 'POST',
                body: JSON.stringify({ tripId, ...planData }),
            })
        },
        onSuccess: (data, variables) => {
            // queryClient.invalidateQueries({ queryKey: plansQueryKey(variables.tripId) })
            queryClient.invalidateQueries({ queryKey: ['trip', variables.tripId] })
        },
    })
}

export const useUpdatePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ /* tripId, */ planId, ...planData }: UpdatePlanBody) => {
            return fetchJSON(`/api/plans/${planId}`, {
                method: 'PUT',
                body: JSON.stringify(planData),
            })
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['trip', 'trips'] })
        },
    })
}

export const useDeletePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (plan: Plan) => {
            return fetchJSON(`/api/plans/${plan.id}`, {
                method: 'DELETE',
            })
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['trip', variables.tripId] })
        },
    })
}

export const useClonePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ planId }: ClonePlanBody) => {
            return fetchJSON(`/api/plans/${planId}/clone`, {
                method: 'POST',
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['trip', data.tripId] })
        },
    })
}
