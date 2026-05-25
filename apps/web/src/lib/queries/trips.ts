import { Trip } from '@repo/shared/types'
import { fetchJSON } from '@repo/shared/utils/api'
import { useQuery } from '@tanstack/react-query'
import { keepPreviousData } from '@tanstack/react-query'

import * as store from '@/store'

export const useTripsQuery = (opts = {}) => useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
        
        try {
            
            const data = await fetchJSON<Trip[]>('/api/trips')
            
            store.trips.setValue(data || [])
            
            return data
            
        } catch (e) {
            
            console.error('queries/trips', e)
            throw e
            
        }
        
    },
    enabled: true,
    placeholderData: keepPreviousData,
    retry: 3,
    ...opts,
})
