import teamsRepo from '@repo/shared/db/repos/teams'
import usersRepo from '@repo/shared/db/repos/users'
import userTeamsRepo from '@repo/shared/db/repos/userTeams'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    teamId: z.coerce.number(),
})

export const inviteTeamMember = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { teamId } = paramsSchema.parse(req.params)
        const { inviteeEmail } = req.body
        
        if (!inviteeEmail?.length)
            return apiResponse.invalidParams(res, 'Param "inviteeEmail" is required')
        
        const invitee = await usersRepo.findOneByEmail(inviteeEmail)
        
        if (!invitee)
            return apiResponse.notFound(res, 'Invitee not found')
        
        const team = await teamsRepo.findOneById(teamId)
        
        if (!team)
            return apiResponse.notFound(res, 'Team not found')
        
        await userTeamsRepo.create({
            userId: invitee.id,
            teamId: team.id,
        })
        
        return apiResponse.ok(res, { team, inviteeEmail })
        
    } catch (e) {
        
        console.error('Error inviting user to team:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
