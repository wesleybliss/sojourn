import placesRepo from '@repo/shared/db/repos/places'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'

export const getPlaces = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { teamId } = req.auth
        
        if (!teamId)
            throw new Error('Team ID is required')
        
        const places = await placesRepo.findAllBy('teamId', teamId)
        
        return apiResponse.ok(res, places)
        
    } catch (e) {
        
        console.error('Error getting places:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
