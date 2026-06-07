import db from '@repo/shared/db'
import teamsRepo from '@repo/shared/db/repos/teams'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    teamId: z.coerce.number(),
})

export const updateTeam = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { teamId } = paramsSchema.parse(req.params)
        
        const team = await teamsRepo.findOneById(teamId)
        
        if (!team)
            return apiResponse.notFound(res, 'Team')
        
        const [updatedTeam] = await db
            .update(schemas.teams)
            .set({
                name: req.body.name,
                description: req.body.description,
            })
            .where(eq(schemas.teams.id, teamId))
            .returning()
        
        if (!updatedTeam)
            return apiResponse.notFound(res, 'Team')
        
        return apiResponse.ok(res, updatedTeam)
        
    } catch (e) {
        
        console.error('Error updating team:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
