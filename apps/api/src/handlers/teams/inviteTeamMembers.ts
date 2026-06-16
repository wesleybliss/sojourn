import db from '@repo/shared/db'
import teamsRepo from '@repo/shared/db/repos/teams'
import usersRepo from '@repo/shared/db/repos/users'
import userTeamsRepo from '@repo/shared/db/repos/userTeams'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
    teamId: z.coerce.number(),
    inviteeEmails: z.array(z.coerce.string()),
})

export const inviteTeamMembers = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { teamId, inviteeEmails } = bodySchema.parse(req.body)
        
        if (!inviteeEmails?.length)
            return apiResponse.invalidParams(res, 'Param "inviteeEmails" is required')
        
        const team = await teamsRepo.findOneById(teamId)
        
        if (!team)
            return apiResponse.notFound(res, 'Team not found')
        
        await db.transaction(async tx => {
            
            for (const email of inviteeEmails) {
                
                const invitee = await usersRepo.tx(tx).findOneByEmail(email)
                
                if (!invitee)
                    return apiResponse.notFound(res, 'Invitee not found')
                
                await userTeamsRepo.create({
                    userId: invitee.id,
                    teamId: team.id,
                })
                
            }
            
        })
        
        return apiResponse.ok(res, { team, inviteeEmails })
        
    } catch (e) {
        
        console.error('Error inviting user to team:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
