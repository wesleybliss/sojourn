import { getRandomUnsplashImageUrl } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { Request, Response } from 'express'

export const getRandomPhoto = withAuth(async (
    req: Request,
    res: Response,
    _context: AuthContext,
): Promise<void> => {
    
    const { topic } = req.body
    
    try {
        
        const url = await getRandomUnsplashImageUrl(topic)
        
        return apiResponse.ok(res, { data: url })
        
    } catch (e) {
        
        console.error(`Error getting random photo with topic ${topic}:`, e)
        return apiResponse.internalServerError(res)
        
    }
    
})
