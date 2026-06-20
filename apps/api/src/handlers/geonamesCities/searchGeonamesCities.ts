import geonamesCitiesRepo from '@repo/shared/db/repos/geonamesCities'
import { citySchemas } from '@repo/shared/schemas/zod'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'

export const searchGeonamesCities = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const {
            query,
            minimumPopulation,
            countryCode,
        } = citySchemas.searchQuerySchema.parse(req.query)
        
        const results = await geonamesCitiesRepo.searchCitiesGIN(
            query,
            minimumPopulation,
            countryCode,
        )
        
        return apiResponse.ok(res, results)
        
    } catch (e) {
        
        console.error('Error searching cities:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
