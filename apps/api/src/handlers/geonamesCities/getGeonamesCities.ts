import geonamesCitiesRepo from '@repo/shared/db/repos/geonamesCities'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
    offset: z.coerce.number(),
    limit: z.coerce.number(),
})

export const getGeonamesCities = async (
    _req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { offset, limit } = querySchema.parse(_req.query)
        
        const cities = await geonamesCitiesRepo.findAll({
            offset,
            limit,
        })
        
        return apiResponse.ok(res, cities)
        
    } catch (e) {
        
        console.error('Error getting cities:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
