import userTeamsRepo from '@repo/shared/db/repos/userTeams'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { and, eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    teamId: z.coerce.number(),
})

export const getTeam = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { teamId } = paramsSchema.parse(req.params)
        
        const [userTeam] = await userTeamsRepo.select()
            .where(and(
                eq(userTeamsRepo.schema.userId, req.auth.userId),
                eq(userTeamsRepo.schema.teamId, teamId),
            ))
            .leftJoin(schemas.teams, eq(schemas.teams.id, schemas.userTeams.teamId))
            .limit(1)
        
        if (!userTeam?.teams)
            return apiResponse.notFound(res, 'Team')
        
        // @todo return only the 1 team
        return apiResponse.ok(res, userTeam?.teams)
        
    } catch (e) {
        
        console.error('Error creating team:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
