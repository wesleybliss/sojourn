import { GeonamesCity } from '@repo/shared/types'
import { fetchJSON } from '@repo/shared/utils/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useAuth } from '@/components/providers/AuthProvider'

export type CitiesQueryArgs = {
    offset?: number
    limit?: number
    opts?: Record<string, unknown>
}

export const useCitiesQuery = ({
    offset,
    limit,
    opts = {},
}: CitiesQueryArgs = {}) => {
    
    return useQuery({
        queryKey: ['cities'],
        queryFn: async () => {
            
            try {
                
                const searchParams = new URLSearchParams()
                
                if (offset !== undefined)
                    searchParams.set('offset', offset.toString())
                
                if (limit)
                    searchParams.set('limit', limit.toString())
                
                const queryString = searchParams.toString()
                
                const result = await fetchJSON<GeonamesCity[]>(
                    `cities${queryString ? `?${queryString}` : ''}`)
                
                return result.data
                
            } catch (e) {
                
                console.error('queries/cities', e)
                throw e
                
            }
            
        },
        placeholderData: keepPreviousData,
        retry: 0,
        ...opts,
    })
    
}

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
