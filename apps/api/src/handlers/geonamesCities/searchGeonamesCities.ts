import geonamesCitiesRepo from '@repo/shared/db/repos/geonamesCities'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
    query: z.coerce.string(),
})

export const searchGeonamesCities = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { query } = querySchema.parse(req.query)
        
        const results = await geonamesCitiesRepo.searchCities(query)
        
        return apiResponse.ok(res, results)
        
    } catch (e) {
        
        console.error('Error searching cities:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
