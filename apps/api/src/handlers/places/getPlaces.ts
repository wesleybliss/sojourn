import placesRepo from '@repo/shared/db/repos/places'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    teamId: z.coerce.number(),
})

export const getPlaces = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { teamId } = paramsSchema.parse(req.params)
        
        const places = await placesRepo.findAllByTeamId(teamId)
        
        return apiResponse.ok(res, places)
        
    } catch (e) {
        
        console.error('Error getting places:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
