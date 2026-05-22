import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@repo/shared/utils/auth'
import { getRandomUnsplashImageUrl } from '@repo/shared/utils'

export const POST = withAuth(async (request: NextRequest/* , { params } */) => {
    
    const body = await request.json()
    const { topic } = body
    
    try {
        
        const url = await getRandomUnsplashImageUrl(topic)
        
        return NextResponse.json({
            success: true,
            data: url,
        })
        
    } catch (e) {
        
        console.error(`Error getting random photo with topic ${topic}:`, e)
        return NextResponse.json(
            { success: false, error: (e as Error).message },
            { status: 500 })
        
    }
    
})
