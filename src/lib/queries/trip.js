import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as store from '@/store'

const idToInt = obj => obj?.id ? parseInt(obj?.id, 10) : null

export const useTripQuery = (tripId, updateStore = false) => useQuery({
    queryKey: ['trip', tripId],
    queryFn: async () => {
        
        try {
            
            const res = await fetch(`/api/trips/${tripId}?withDetails=true`)
            const { data } = await res.json()
            
            if (updateStore)
                store.currentTripId.setValue(idToInt(data))
            
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
