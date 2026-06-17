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
        
        const total = await geonamesCitiesRepo.count()
        
        const cities = await geonamesCitiesRepo.findAll({
            offset,
            limit,
            orderBy: geonamesCitiesRepo.schema.asciiName,
            orderDirection: 'asc',
        })
        
        return apiResponse.ok(res, {
            total,
            cities,
        })
        
    } catch (e) {
        
        console.error('Error getting cities:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
