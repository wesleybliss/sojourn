import db from '@repo/shared/db'
import usersRepo from '@repo/shared/db/repos/users'
import userTeamsRepo from '@repo/shared/db/repos/userTeams'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { and, eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    teamId: z.coerce.number(),
})

export const deleteTeam = async (
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
        
        if (!userTeam)
            return apiResponse.unauthorized(res, 'User is not a member of this team')
        
        const members = await usersRepo.count(usersRepo.schema.id)
        
        if (members > 0)
            return apiResponse.badRequest(res, 'Cannot delete team with members')
        
        const [deletedTeam] = await db
            .delete(schemas.teams)
            .where(eq(schemas.teams.id, teamId))
            .returning()
        
        if (!deletedTeam)
            return apiResponse.notFound(res, 'Team')
        
        return apiResponse.okMessage(res, 'Team deleted successfully')
        
    } catch (e) {
        
        console.error('Error deleting team:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
