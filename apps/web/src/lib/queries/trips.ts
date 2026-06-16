import { useWireValue } from '@forminator/react-wire'
import { Trip, TripWithSegmentCount } from '@repo/shared/types'
import { fetchJSON } from '@repo/shared/utils/api'
import { keepPreviousData, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useEffect } from 'react'

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

export const useTripsQuery = ({
    withCounts = false,
    withDetails = false,
    options,
}: UseTripsQueryParams = {}): TripsQueryResult => {
    
    const { firebaseUser } = useAuth()
    const currentTeamId = useWireValue(store.currentTeamId)
    const queryClient = useQueryClient()
    
    /*useEffect(() => {
        if (!currentTeamId) return
        
        queryClient.invalidateQueries({
            queryKey: ['trips'],
            refetchType: 'active',
        })
    }, [currentTeamId, queryClient])*/
    
    return useQuery({
        queryKey: ['trips', currentTeamId, { withCounts, withDetails }],
        queryFn: async () => {
            
            try {
                
                const searchParams = new URLSearchParams()
                
                if (withCounts)
                    searchParams.set('withCounts', 'true')
                
                if (withDetails)
                    searchParams.set('withDetails', 'true')
                
                const queryString = searchParams.toString()
                const result = await fetchJSON<Array<Trip | TripWithSegmentCount>>(
                    `${currentTeamId}/trips${queryString ? `?${queryString}` : ''}`,
                )
                console.log('trips query result', result)
                store.trips.setValue((result.data as Trip[]) || [])
                
                return result.data
                
            } catch (e) {
                
                console.error('queries/trips', e)
                throw e
                
            }
            
        },
        enabled: !!firebaseUser && !!currentTeamId,
        placeholderData: keepPreviousData,
        retry: 3,
        ...options,
    })
    
}
