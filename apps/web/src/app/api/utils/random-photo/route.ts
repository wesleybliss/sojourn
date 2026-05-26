import { getRandomUnsplashImageUrl } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import { NextRequest } from 'next/server'

export const POST = withAuth(async (request: NextRequest/* , { params } */) => {
    
    const body = await request.json()
    const { topic } = body
    
    try {
        
        const url = await getRandomUnsplashImageUrl(topic)
        
        return apiResponse.ok({ data: url })
        
    } catch (e) {
        
        console.error(`Error getting random photo with topic ${topic}:`, e)
        return apiResponse.internalServerError()
        
    }
    
})
