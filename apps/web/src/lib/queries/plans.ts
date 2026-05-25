import { ID } from '@repo/shared/types/data'
import { Plan } from '@repo/shared/types/database'
import { ClonePlanBody, CreatePlanBody, UpdatePlanBody } from '@repo/shared/types/mutations'
import { fetchJSON } from '@repo/shared/utils/api'
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query'
import { keepPreviousData } from '@tanstack/react-query'
/* import * as store from '@/store'
import { updateItemArray } from '@/lib/storeUtils' */

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

export const useCreatePlan = (): UseMutationResult<Plan, Error, CreatePlanBody, unknown> => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, ...planData }: CreatePlanBody) => {
            return fetchJSON('/api/plans', {
                method: 'POST',
                body: JSON.stringify({ tripId, ...planData }),
            })
        },
        onSuccess: (_data: Plan, variables) => {
            // @todo do something with _data
            
            // queryClient.invalidateQueries({ queryKey: plansQueryKey(variables.tripId) })
            queryClient.invalidateQueries({ queryKey: ['trip', variables.tripId] })
        },
    })
}

export const useUpdatePlan = (): UseMutationResult<Plan | undefined, Error, UpdatePlanBody, unknown> => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ /* tripId, */ planId, ...planData }: UpdatePlanBody) => {
            return fetchJSON(`/api/plans/${planId}`, {
                method: 'PUT',
                body: JSON.stringify(planData),
            })
        },
        onSuccess: (_data: Plan | undefined, _variables) => {
            // @todo do something with _data
            queryClient.invalidateQueries({ queryKey: ['trip', 'trips'] })
        },
    })
}

export const useDeletePlan = (): UseMutationResult<Plan | undefined, Error, Plan, unknown> => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (plan: Plan) => {
            return fetchJSON(`/api/plans/${plan.id}`, {
                method: 'DELETE',
            })
        },
        onSuccess: (_data: Plan | undefined, variables) => {
            // @todo use _data
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
