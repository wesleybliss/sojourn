import { ApiResult, ID, Team, type TeamInsert, TeamWithMembers, UpdateTeamBody } from '@repo/shared/types'
import { omit } from '@repo/shared/utils'
import { fetchJSON } from '@repo/shared/utils/api'
import {
    keepPreviousData, useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
    UseQueryOptions,
    UseQueryResult,
} from '@tanstack/react-query'

import { useAuth } from '@/components/providers/AuthProvider'
import { updateItemArray } from '@/lib/storeUtils'
import * as store from '@/store'

type TeamsQueryResultData = Team[] | TeamWithMembers[] | null | undefined
type TeamQueryResultData = Team | null | undefined

type TeamsQueryOptions = UseQueryOptions<
    TeamsQueryResultData,
    Error,
    TeamsQueryResultData,
    (string | Record<string, boolean>)[]
>

type TeamQueryOptions = UseQueryOptions<
    TeamQueryResultData,
    Error,
    TeamQueryResultData,
    (string | Record<string, boolean>)[]
>

type TeamsQueryOverrideOptions = Omit<TeamsQueryOptions, 'queryFn' | 'queryKey'>
type TeamQueryOverrideOptions = Omit<TeamQueryOptions, 'queryFn' | 'queryKey'>

interface UseTeamsQueryParams {
    withMembers?: boolean
    options?: TeamsQueryOverrideOptions
}

interface UseTeamQueryParams {
    withMembers?: boolean
    options?: TeamQueryOverrideOptions
}

type TeamsQueryResult = UseQueryResult<TeamsQueryResultData, Error>
type TeamQueryResult = UseQueryResult<TeamQueryResultData, Error>

export const useTeamsQuery = ({
    withMembers = false,
    options,
}: UseTeamsQueryParams = {}): TeamsQueryResult => {
    
    const { firebaseUser } = useAuth()
    
    return useQuery({
        queryKey: ['teams', { withMembers }],
        queryFn: async () => {
            
            try {
                
                const searchParams = new URLSearchParams()
                
                if (withMembers)
                    searchParams.set('withMembers', 'true')
                
                const queryString = searchParams.toString()
                const result = await fetchJSON<Array<Team>>(
                    `teams${queryString ? `?${queryString}` : ''}`,
                )
                
                store.teams.setValue((result.data as Team[]) || [])
                
                return result.data
                
            } catch (e) {
                
                console.error('queries/teams', e)
                throw e
                
            }
            
        },
        enabled: !!firebaseUser,
        placeholderData: keepPreviousData,
        retry: 3,
        ...options,
    })
    
}

export const useTeamQuery = (teamId: ID, {
    options,
}: UseTeamQueryParams = {}): TeamQueryResult => {
    
    const { firebaseUser } = useAuth()
    
    return useQuery({
        queryKey: ['team', teamId.toString()],
        queryFn: async () => {
            
            try {
                
                const result = await fetchJSON<Team>(
                    `teams/${teamId}`,
                )
                
                if (result.data)
                    updateItemArray(store.teams, result.data)
                
                return result.data
                
            } catch (e) {
                
                console.error('queries/team', e)
                throw e
                
            }
            
        },
        enabled: !!firebaseUser,
        placeholderData: keepPreviousData,
        retry: 3,
        ...options,
    })
    
}

export const useCreateTeam = (): UseMutationResult<ApiResult<Team | null>, Error, TeamInsert, unknown> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (teamData: TeamInsert) => {
            return fetchJSON<Team>('teams', {
                method: 'POST',
                body: JSON.stringify(teamData),
            })
        },
        onSuccess: (_data: ApiResult<Team | null>, _variables) => {
            queryClient.invalidateQueries({ queryKey: ['teams'] })
        },
    })
    
}

export const useUpdateTeam = (): UseMutationResult<ApiResult<Team | null>, Error, UpdateTeamBody, unknown> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (teamData: UpdateTeamBody) => {
            return fetchJSON<Team>(`teams/${teamData.id}`, {
                method: 'PUT',
                body: JSON.stringify(omit(teamData, ['id'])),
            })
        },
        onSuccess: (_data: ApiResult<Team | null>, variables) => {
            queryClient.invalidateQueries({ queryKey: ['teams'] })
            queryClient.invalidateQueries({ queryKey: ['team', variables.id.toString()] })
        },
    })
    
}
