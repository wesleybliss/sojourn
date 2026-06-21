import geonamesCitiesRepo from '@repo/shared/db/repos/geonamesCities'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    id: z.coerce.number(),
})

export const getGeonamesCity = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { id } = paramsSchema.parse(req.params)
        
        const city = await geonamesCitiesRepo.findOneById(id)
        
        return apiResponse.ok(res, city)
        
    } catch (e) {
        
        console.error('Error getting city:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
