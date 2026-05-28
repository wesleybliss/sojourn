import placesRepo from '@repo/shared/db/repos/places'
import { apiResponse } from '@repo/shared/utils/api'
import { AuthContext, withAuth } from '@repo/shared/utils/auth'
import { VercelRequest, VercelResponse } from '@vercel/node'

export const getPlaces = withAuth(async (
    _req: VercelRequest,
    res: VercelResponse,
    _context: AuthContext,
): Promise<VercelResponse> => {
    
    try {
        
        const places = await placesRepo.findAll()
        
        return apiResponse.ok(res, places)
        
    } catch (e) {
        
        console.error('Error getting places:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
