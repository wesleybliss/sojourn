import placesRepo from '@repo/shared/db/repos/places'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'

export const getPlaces = async (
    _req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const places = await placesRepo.findAll()
        
        return apiResponse.ok(res, places)
        
    } catch (e) {
        
        console.error('Error getting places:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
