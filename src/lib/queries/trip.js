import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as store from '@/store'
import { updateItemArray } from '@/lib/storeUtils.js'

const idToInt = obj => obj?.id ? parseInt(obj?.id, 10) : null

export const useTripQuery = tripId => useQuery({
    queryKey: ['trip', tripId],
    queryFn: async () => {
        
        try {
            
            const res = await fetch(`/api/trips/${tripId}?withDetails=true`)
            const { data } = await res.json()
            
            updateItemArray(store.trips, data)
            // store.currentTripId.setValue(idToInt(data))
            store.currentTripId.setValue(data.id)
            
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
    
    return useMutation({
        mutationFn: async tripData => {
            const res = await fetch('/api/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripData),
            })
            const { data } = await res.json()
            
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
            const res = await fetch(`/api/trips/${tripId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tripData),
            })
            
            if (!res.ok) throw new Error('Failed to update trip')
            return res.json()
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['trip', variables.tripId])
            queryClient.invalidateQueries(['trips'])
        },
    })
}

export const useAddSegment = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async segmentData => {
            const res = await fetch('/api/segments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(segmentData),
            })
            
            if (!res.ok) throw new Error('Failed to add segment')
            return res.json()
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['trip', data.tripId])
        },
    })
}

export const useUpdateSegment = () => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ segmentId, ...segmentData }) => {
            const res = await fetch(`/api/segments/${segmentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(segmentData),
            })
            
            if (!res.ok) throw new Error('Failed to update segment')
            return res.json()
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['trip', data.tripId])
        },
    })
    
}

export const useDeleteSegments = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async segmentIds => {
            const res = await fetch('/api/segments', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: segmentIds }),
            })
            
            if (!res.ok) throw new Error('Failed to delete segments')
            return res.json()
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['trip', data.tripId])
        },
    })
}

export const useClonePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ planId }) => {
            const res = await fetch(`/api/plans/${planId}/clone`, { method: 'POST' })
            
            if (!res.ok) throw new Error('Failed to clone plan')
            return res.json()
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['trip', data.tripId])
        },
    })
}

export const useRenamePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ planId, name }) => {
            const res = await fetch(`/api/plans/${planId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            })
            
            if (!res.ok) throw new Error('Failed to rename plan')
            return res.json()
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
            const res = await fetch(`/api/plans/${planId}`, { method: 'DELETE' })
            
            if (!res.ok) throw new Error('Failed to delete plan')
            return res.json()
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
            await fetch(`/api/trips/${tripId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['trips'])
        },
    })
    
}
