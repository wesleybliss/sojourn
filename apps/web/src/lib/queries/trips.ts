import { Trip, TripWithSegmentCount } from '@repo/shared/types'
import { ID } from '@repo/shared/types/data.types'
import { fetchJSON } from '@repo/shared/utils/api'
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'

import { useAuth } from '@/components/providers/AuthProvider'
import * as store from '@/store'

type TripsQueryResultData = Array<Trip | TripWithSegmentCount> | null | undefined

type TripsQueryOptions = UseQueryOptions<
    TripsQueryResultData,
    Error,
    TripsQueryResultData,
    (string | number | null | Record<string, boolean>)[]
>

type TripsQueryOverrideOptions = Omit<TripsQueryOptions, 'queryFn' | 'queryKey'>

interface UseTripsQueryParams {
    withCounts?: boolean
    withDetails?: boolean
    options?: TripsQueryOverrideOptions
}

type TripsQueryResult = UseQueryResult<TripsQueryResultData, Error>

export const useTripsQuery = (teamId: ID | null, {
    withCounts = false,
    withDetails = false,
    options,
}: UseTripsQueryParams = {}): TripsQueryResult => {
    
    const { firebaseUser } = useAuth()
    
    return useQuery({
        queryKey: ['trips', teamId, { withCounts, withDetails }],
        queryFn: async () => {
            
            try {
                
                const searchParams = new URLSearchParams()
                
                if (withCounts)
                    searchParams.set('withCounts', 'true')
                
                if (withDetails)
                    searchParams.set('withDetails', 'true')
                
                const queryString = searchParams.toString()
                const result = await fetchJSON<Array<Trip | TripWithSegmentCount>>(
                    `${teamId}/trips${queryString ? `?${queryString}` : ''}`,
                )
                console.log('trips query result', result)
                store.trips.setValue((result.data as Trip[]) || [])
                
                return result.data
                
            } catch (e) {
                
                console.error('queries/trips', e)
                throw e
                
            }
            
        },
        enabled: !!firebaseUser && !!teamId,
        retry: 3,
        ...options,
    })
    
}
