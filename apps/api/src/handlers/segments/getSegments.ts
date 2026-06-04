import segmentsRepo from '@repo/shared/db/repos/segments'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'

export const getSegments = async (
    _req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const segments = await segmentsRepo.findAll()
        
        return apiResponse.ok(res, segments)
        
    } catch (e) {
        
        console.error('Error getting segments:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
