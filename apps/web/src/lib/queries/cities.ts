import { citySchemas } from '@repo/shared/schemas/zod'
import { GeonamesCity, ID } from '@repo/shared/types'
import { fetchJSON } from '@repo/shared/utils/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useAuth } from '@/components/providers/AuthProvider'

export type CitiesQueryArgs = {
    offset?: number
    limit?: number
    opts?: Record<string, unknown>
}

export type CitiesWrap = {
    total: number
    cities: GeonamesCity[]
}

export type CitiesSearchQueryArgs = {
    query: string
    minimumPopulation?: number | undefined
    countryCode?: string | undefined
    opts?: Record<string, unknown>
}

export const useCitiesQuery = ({
    offset,
    limit,
    opts = {},
}: CitiesQueryArgs = {}) => {
    
    const { firebaseUser } = useAuth()
    
    return useQuery({
        queryKey: ['cities', offset, limit],
        queryFn: async () => {
            
            try {
                
                const searchParams = new URLSearchParams()
                
                if (offset !== undefined)
                    searchParams.set('offset', offset.toString())
                
                if (limit)
                    searchParams.set('limit', limit.toString())
                
                const queryString = searchParams.toString()
                
                const result = await fetchJSON<CitiesWrap>(
                    `cities${queryString ? `?${queryString}` : ''}`)
                
                return result.data
                
            } catch (e) {
                
                console.error('queries/cities', e)
                throw e
                
            }
            
        },
        enabled: !!firebaseUser,
        placeholderData: keepPreviousData,
        retry: 0,
        ...opts,
    })
    
}

export const useCityQuery = (cityId: ID | null | undefined, opts = {}) => {
    
    const { firebaseUser } = useAuth()
    
    return useQuery({
        queryKey: ['cities', cityId],
        queryFn: async () => {
            
            try {
                
                const result = await fetchJSON<GeonamesCity>(
                    `cities/${cityId}`)
                
                return result.data
                
            } catch (e) {
                
                console.error('queries/city', e)
                throw e
                
            }
            
        },
        enabled: !!firebaseUser && !!cityId,
        retry: 0,
        ...opts,
    })
    
}

export const useCitiesSearchQuery = (args: CitiesSearchQueryArgs) => {
    
    const { firebaseUser } = useAuth()
    
    const {
        query,
        minimumPopulation,
        countryCode,
    } = citySchemas.searchQuerySchema.parse(args)
    
    return useQuery({
        queryKey: ['cities', query, minimumPopulation, countryCode],
        queryFn: async ({ signal }) => {
            
            try {
                
                const searchParams = new URLSearchParams()
                
                searchParams.set('query', query)
                
                if (minimumPopulation)
                    searchParams.set('minimumPopulation', minimumPopulation.toString())
                
                if (countryCode)
                    searchParams.set('countryCode', countryCode)
                
                const queryString = searchParams.toString()
                
                // React Query aborts this signal whenever the queryKey changes
                // (e.g. as the user types) or the consumer unmounts, so in-flight
                // requests for stale queries are cancelled instead of racing.
                const result = await fetchJSON<GeonamesCity[]>(
                    `cities/search${queryString ? `?${queryString}` : ''}`,
                    { signal })
                
                return result.data
                
            } catch (e) {
                
                if ((e as Error)?.name === 'AbortError')
                    // Let React Query recognize the cancellation so the cache
                    // keeps its previous value instead of being overwritten with null.
                    throw e
                
                console.error('queries/citiesSearch', e)
                throw e
                
            }
            
        },
        enabled: !!firebaseUser && query.length > 0,
        placeholderData: [],
        retry: 0,
        ...args.opts,
    })
}
