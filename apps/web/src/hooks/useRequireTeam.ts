import { useWireState } from '@forminator/react-wire'
import { Team } from '@repo/shared/types'
import { tryCatch } from '@repo/shared/utils'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { matchPath, useLocation } from 'react-router'
import { z } from 'zod'

import { useAuth } from '@/components/providers/AuthProvider'
import { useTeamsQuery } from '@/lib/queries/teams'
import * as store from '@/store'

const paramsSchema = z.object({
    teamId: z.coerce.number().optional(),
})

export type TUseRequireTeam = {
    currentTeamId: number | null
    setCurrentTeamId: Dispatch<SetStateAction<number | null>>
    teams: Team[] | null | undefined
    error: Error | null
    isPending: boolean
}

const useRequireTeam = (): TUseRequireTeam => {
    
    const { pathname } = useLocation()
    
    const params = useMemo(() => {
        
        const match = matchPath('/:teamId/*', pathname)
        const teamId = tryCatch(() => paramsSchema.parse(match?.params || {})?.teamId || null, null)
        
        return {
            slug: match?.params.teamId,
            teamId,
        }
        
    }, [pathname])
    
    const [currentTeamId, setCurrentTeamId] = useWireState(store.currentTeamId)
    
    const { loading, firebaseUser } = useAuth()
    
    const { data: teams, isError, error, isPending  } = useTeamsQuery()
    
    useEffect(() => {
        
        if (loading) return
        
        if (!firebaseUser) {
            console.warn('useRequireTeam: user not signed in')
            window.location.href = '/login'
            return
        }
        
        if (isPending) return
        
        if (isError) {
            console.error('useRequireTeam', error)
            window.location.href = '/login'
            return
        }
        
        const { slug, teamId } = params
        
        console.log('useRequireTeam', { teams, teamId, slug })
        
        // User must be a member of at least one team
        if (!teams?.length) {
            window.location.href = '/teams/create'
            return
        }
        
        // User is already in a team they're a member of
        if (teamId && teams.find(it => it.id === teamId)) {
            setCurrentTeamId(teamId)
            return
        }
        
        // This slug is not a team ID, so bail
        if ((slug && !teamId) || (slug && parseInt(slug, 10) !== teamId))
            return
        
        // No team ID in the URL, so pick the most recent one
        const latestTeam = teams.reduce((latest: Team, team: Team) => {
            return dayjs(team.createdAt)
                .isAfter(dayjs(latest.createdAt)) ? team : latest
        }, teams[0])
        
        // Update the saved team ID to match the URL
        setCurrentTeamId(latestTeam.id)
        console.log('useRequireTeam: redirecting', { slug, teamId, teams, latestTeam })
        // Redirect the user to the new default team
        window.location.href = `/${latestTeam.id}`
        
    }, [loading, firebaseUser, params, isPending, isError, error, teams])
    
    return {
        
        currentTeamId,
        setCurrentTeamId,
        teams,
        error,
        isPending,
        
    }
    
}

export default useRequireTeam
