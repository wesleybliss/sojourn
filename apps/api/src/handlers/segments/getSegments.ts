import segmentsRepo from '@repo/shared/db/repos/segments'
import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export const getSegments = withAuth(async (
    _req: VercelRequest,
    res: VercelResponse,
    _context: AuthContext,
): Promise<VercelResponse> => {
    
    try {
        
        const segments = await segmentsRepo.findAll()
        
        return apiResponse.ok(res, segments)
        
    } catch (e) {
        
        console.error('Error getting segments:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
