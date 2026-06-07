import { useWireState } from '@forminator/react-wire'
import { Team } from '@repo/shared/types'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { z } from 'zod'

import useTypedParams from '@/hooks/useTypedParams'
import { useTeamsQuery } from '@/lib/queries/teams'
import * as store from '@/store'

const paramsSchema = z.object({
    teamId: z.coerce.number().optional(),
})

const paramsSchemaInitial = z.object({
    teamId: z.string().optional(),
})

export type TUseRequireTeam = {
    currentTeamId: number | null
    setCurrentTeamId: Dispatch<SetStateAction<number | null>>
    teams: Team[] | null | undefined
    error: Error | null
    isPending: boolean
}

const useRequireTeam = (): TUseRequireTeam => {
    
    const params = useTypedParams(paramsSchemaInitial)
    
    const [currentTeamId, setCurrentTeamId] = useWireState(store.currentTeamId)
    
    const { data: teams, error, isPending  } = useTeamsQuery()
    
    useEffect(() => {
        
        if (isPending) return
        
        const slug = params.teamId
        const { teamId } = paramsSchema.parse(params)
        
        console.log('useRequireTeam', { teams, teamId, slug })
        
        if (!teams?.length) {
            window.location.href = '/teams/create'
            return
        }
        
        const latestTeam = teams.reduce((latest: Team, team: Team) => {
            return dayjs(team.createdAt as Date).isAfter(dayjs(latest.createdAt as Date)) ? team : latest
        }, teams[0])
        
        const nextTeamId = teamId || latestTeam.id
        
        if (!currentTeamId)
            setCurrentTeamId(nextTeamId)
        
        if (!teamId && !slug?.length)
            window.location.href = `/${nextTeamId}`
        
    }, [params, teams, isPending])
    
    useEffect(() => {
        if (error)
            setTimeout(() => {
                window.location.href = '/login'
            }, 3_000)
    }, [error])
    
    return {
        
        currentTeamId,
        setCurrentTeamId,
        teams,
        error,
        isPending,
        
    }
    
}

export default useRequireTeam
