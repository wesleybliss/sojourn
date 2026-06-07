import db from '@repo/shared/db'
import teamsRepo from '@repo/shared/db/repos/teams'
import userTeamsRepo from '@repo/shared/db/repos/userTeams'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
    name: z.coerce.string(),
    description: z.coerce.string().optional(),
})

export const createTeam = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const {
            name,
            description,
        } = bodySchema.parse(req.body)
        
        const newTeam = await db.transaction(async () => {
            
            const newTeam = await teamsRepo.create({
                name,
                description,
            })
            
            await userTeamsRepo.create({
                userId: req.auth.userId,
                teamId: newTeam.id,
            })
            
            return newTeam
            
        })
        
        return apiResponse.ok(res, newTeam)
        
    } catch (e) {
        
        console.error('Error creating team:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
