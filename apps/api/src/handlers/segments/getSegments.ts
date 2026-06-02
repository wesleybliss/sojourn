import segmentsRepo from '@repo/shared/db/repos/segments'
import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { Request, Response } from 'express'

export const getSegments = withAuth(async (
    _req: Request,
    res: Response,
    _context: AuthContext,
): Promise<void> => {
    
    try {
        
        const segments = await segmentsRepo.findAll()
        
        return apiResponse.ok(res, segments)
        
    } catch (e) {
        
        console.error('Error getting segments:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
