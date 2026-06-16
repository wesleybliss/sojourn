import { useWire, Wire } from '@forminator/react-wire'
import { ApiResult, Team, UpdateTeamBody } from '@repo/shared/types'
import { UseMutationResult } from '@tanstack/react-query'

import { useTeamsQuery, useUpdateTeam } from '@/lib/queries/teams'
import * as store from '@/store'

export type TTeamsPageViewModel = {
    // Global State
    updateTeamDialogId: Wire<number | null>
    inviteTeamMemberDialogTeamId: Wire<number | null>
    
    // Queries
    teams: Team[] | null | undefined
    isError: boolean
    isPending: boolean
    error: Error | null
    
    // Mutations
    updateTeamMutation: UseMutationResult<ApiResult<Team | null>, Error, UpdateTeamBody, unknown>
}

const TeamsPageViewModel = (): TTeamsPageViewModel => {
    
    const updateTeamDialogId = useWire(store.updateTeamDialogId)
    const inviteTeamMemberDialogTeamId = useWire(store.inviteTeamMemberDialogTeamId)
    
    const {
        data: teams,
        isError,
        isPending,
        error,
    } = useTeamsQuery({ withMembers: true })
    
    const updateTeamMutation = useUpdateTeam()
    
    return {
        
        // Global State
        updateTeamDialogId,
        inviteTeamMemberDialogTeamId,
        
        // Queries
        teams,
        isError,
        isPending,
        error,
        
        // Mutations
        updateTeamMutation,
        
    }
    
}

export default TeamsPageViewModel
