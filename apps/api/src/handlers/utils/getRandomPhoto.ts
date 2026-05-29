import { getRandomUnsplashImageUrl } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export const getRandomPhoto = withAuth(async (
    req: VercelRequest,
    res: VercelResponse,
    _context: AuthContext,
): Promise<VercelResponse> => {
    
    const { topic } = req.body
    
    try {
        
        const url = await getRandomUnsplashImageUrl(topic)
        
        return apiResponse.ok(res, { data: url })
        
    } catch (e) {
        
        console.error(`Error getting random photo with topic ${topic}:`, e)
        return apiResponse.internalServerError(res)
        
    }
    
})
