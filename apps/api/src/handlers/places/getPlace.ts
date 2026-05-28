import placesRepo from '@repo/shared/db/repos/places'
import { apiResponse } from '@repo/shared/utils/api'
import { AuthContext, withAuth } from '@repo/shared/utils/auth'
import { VercelRequest, VercelResponse } from '@vercel/node'

export const getPlace = withAuth(async (
    req: VercelRequest,
    res: VercelResponse,
    _context: AuthContext,
): Promise<VercelResponse> => {
    
    try {
        
        const placeId = parseInt(req.query.placeId as string, 10)
        
        const place = await placesRepo.findOneById(placeId)
        
        return apiResponse.ok(res, place)
        
    } catch (e) {
        
        console.error('Error getting place:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
