import { GeonamesCity } from '@repo/shared/types'
import { fetchJSON } from '@repo/shared/utils/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useAuth } from '@/components/providers/AuthProvider'

export const useCitiesSearchQuery = (opts = {}) => {
    
    const { firebaseUser } = useAuth()
    
    return useQuery({
        queryKey: ['cities'],
        queryFn: async () => {
            
            try {
                
                const result = await fetchJSON<Partial<GeonamesCity>[]>('cities/search')
                
                return result.data
                
            } catch (e) {
                
                console.error('queries/places', e)
                throw e
                
            }
            
        },
        enabled: !!firebaseUser,
        placeholderData: keepPreviousData,
        retry: 0,
        ...opts,
    })
}
