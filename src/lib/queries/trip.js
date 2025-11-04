import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as store from '@/store'
import { updateItemArray } from '@/lib/storeUtils.js'
import tripsRepo from '@/db/repos/trips'
import plansRepo from '@/db/repos/plans'
import segmentsRepo from '@/db/repos/segments'
import { syncDb } from '@/db/clientDb'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

export const useTripQuery = tripId => useQuery({
    queryKey: ['trip', tripId],
    queryFn: async () => {
        
        try {
            const data = await tripsRepo.findOneWithDetails(tripId, plansRepo)
            
            if (!data) throw new Error('Trip not found')
            
            // @todo need to handle this better
            try {
                updateItemArray(store.trips, data)
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
    retry: 0,
})

export const useCreateTripMutation = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async tripData => {
            const newTrip = await tripsRepo.create(tripData)
            
            return newTrip
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['trips'])
            
            if (online) {
                syncDb().catch(err => console.error('Sync after create failed:', err))
            }
        },
    })
}

export const useUpdateTrip = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async ({ tripId, ...tripData }) => {
            const updated = await tripsRepo.updateById(tripId, tripData)
            
            return updated
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries(['trip', variables.tripId])
            
            if (online) {
                syncDb().catch(err => console.error('Sync after update failed:', err))
            }
        },
    })
}

export const useAddSegment = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async segmentData => {
            const newSegment = await segmentsRepo.create(segmentData)
            
            return newSegment
        },
        onSuccess: async data => {
            await queryClient.invalidateQueries(['trip', data.tripId])
            
            if (online) {
                syncDb().catch(err => console.error('Sync after add segment failed:', err))
            }
        },
    })
}

export const useUpdateSegment = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async ({ segmentId, ...segmentData }) => {
            const updated = await segmentsRepo.updateById(segmentId, segmentData)
            
            return updated
        },
        onSuccess: async data => {
            await queryClient.invalidateQueries(['trip', data.tripId])
            
            if (online) {
                syncDb().catch(err => console.error('Sync after update segment failed:', err))
            }
        },
    })
}

export const useDeleteSegments = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async ({ tripId, planId, segmentIds }) => {
            await segmentsRepo.deleteByIds(segmentIds)
            return { tripId, planId, segmentIds }
        },
        onSuccess: async data => {
            await queryClient.invalidateQueries(['trip', data.tripId])
            
            if (online) {
                syncDb().catch(err => console.error('Sync after delete segments failed:', err))
            }
        },
    })
}

/**
 * @deprecated
 * @returns {UseMutationResult<any, DefaultError, {readonly planId?: *, readonly name?: *}, unknown>}
 */
export const useRenamePlan = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async ({ planId, name }) => {
            const updated = await plansRepo.updateById(planId, { name })
            
            return updated
        },
        onSuccess: async data => {
            await queryClient.invalidateQueries(['trip', data.tripId])
            
            if (online) {
                syncDb().catch(err => console.error('Sync after rename plan failed:', err))
            }
        },
    })
}

export const useDeletePlan = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async ({ planId }) => {
            // First get the plan to know its tripId
            const plan = await plansRepo.findOneById(planId)
            
            if (!plan) throw new Error('Plan not found')
            
            await plansRepo.deleteById(planId)
            return { tripId: plan.tripId, planId }
        },
        onSuccess: async data => {
            await queryClient.invalidateQueries(['trip', data.tripId])
            
            if (online) {
                syncDb().catch(err => console.error('Sync after delete plan failed:', err))
            }
        },
    })
}

export const useDeleteTripMutation = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async tripId => {
            await tripsRepo.deleteById(tripId)
            return tripId
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['trips'])
            
            if (online) {
                syncDb().catch(err => console.error('Sync after delete trip failed:', err))
            }
        },
    })
}
