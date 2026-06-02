import placesRepo from '@repo/shared/db/repos/places'
import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { Request, Response } from 'express'

export const getPlaces = withAuth(async (
    _req: Request,
    res: Response,
    _context: AuthContext,
): Promise<void> => {
    
    try {
        
        const places = await placesRepo.findAll()
        
        return apiResponse.ok(res, places)
        
    } catch (e) {
        
        console.error('Error getting places:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
