import { Trip } from '@repo/shared/types'
import { fetchJSON } from '@repo/shared/utils/api'
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { keepPreviousData } from '@tanstack/react-query'

import * as store from '@/store'

type TripsQueryOptions = UseQueryOptions<
    Trip[] | null | undefined,
    Error,
    Trip[] | null | undefined,
    string[]
>

type TripsQueryResult = UseQueryResult<Trip[] | null | undefined, Error>

export const useTripsQuery = (
    options?: TripsQueryOptions,
): TripsQueryResult => useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
        
        try {
            
            const result = await fetchJSON<Trip[]>('/api/trips')
            
            store.trips.setValue(result.data || [])
            
            return result.data
            
        } catch (e) {
            
            console.error('queries/trips', e)
            throw e
            
        }
        
    },
    enabled: true,
    placeholderData: keepPreviousData,
    retry: 3,
    ...options,
})
