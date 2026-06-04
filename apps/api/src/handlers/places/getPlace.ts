import placesRepo from '@repo/shared/db/repos/places'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    placeId: z.coerce.number(),
})

export const getPlace = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { placeId } = paramsSchema.parse(req.params)
        
        const place = await placesRepo.findOneById(placeId)
        
        return apiResponse.ok(res, place)
        
    } catch (e) {
        
        console.error('Error getting place:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
