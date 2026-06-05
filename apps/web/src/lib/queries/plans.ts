import { fetchJSON } from '@repo/shared/utils/api'
import { ApiResult, ID } from '@shared/types/data.types'
import { Plan } from '@shared/types/database.types'
import { ClonePlanBody, CreatePlanBody, DeletePlanBody, UpdatePlanBody } from '@shared/types/mutations.types'
import { keepPreviousData, useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query'

const plansQueryKey = (tripId: ID, exclusive = false) =>
    exclusive ? [tripId] : ['trips', tripId, 'plans']

export const usePlansQuery = (tripId: ID, opts = {}) => useQuery({
    queryKey: plansQueryKey(tripId),
    queryFn: () => fetchJSON(`trips/${tripId}/plans`),
    enabled: !!tripId,
    placeholderData: keepPreviousData,
    ...opts,
})

export const usePlanQuery = (tripId: ID, planId: ID, opts = {}) => useQuery({
    queryKey: ['plans', planId],
    queryFn: () => fetchJSON(`trips/${tripId}/plans/${planId}`),
    enabled: !!planId,
    placeholderData: keepPreviousData,
    ...opts,
})

export const useCreatePlan = (): UseMutationResult<ApiResult<Plan | null>, Error, CreatePlanBody, unknown> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, ...planData }: CreatePlanBody) => {
            return fetchJSON<Plan>('trips/${tripId}/plans', {
                method: 'POST',
                body: JSON.stringify({ tripId, ...planData }),
            })
        },
        onSuccess: (_data: ApiResult<Plan | null>, variables) => {
            // @todo do something with _data
            
            // queryClient.invalidateQueries({ queryKey: plansQueryKey(variables.tripId) })
            queryClient.invalidateQueries({ queryKey: ['trip', variables.tripId] })
        },
    })
    
}

export const useUpdatePlan = (): UseMutationResult<ApiResult<Plan | null>, Error, UpdatePlanBody, unknown> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, planId, ...planData }: UpdatePlanBody) => {
            return fetchJSON<Plan>(`trips/${tripId}/plans/${planId}`, {
                method: 'PUT',
                body: JSON.stringify(planData),
            })
        },
        onSuccess: (_data: ApiResult<Plan | null>, _variables) => {
            // @todo do something with _data
            queryClient.invalidateQueries({ queryKey: ['trip', 'trips'] })
        },
    })
    
}

export const useDeletePlan = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, planId }: DeletePlanBody) => {
            return fetchJSON<Plan>(`trips/${tripId}/plans/${planId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['trip', data?.data?.tripId] })
        },
    })
    
}

export const useClonePlan = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ tripId, planId }: ClonePlanBody) => {
            return fetchJSON<Plan>(`trips/${tripId}/plans/${planId}/clone`, {
                method: 'POST',
            })
        },
        onSuccess: (data: ApiResult<Plan | null>) => {
            queryClient.invalidateQueries({ queryKey: ['trip', data?.data?.tripId] })
        },
    })
    
}
