import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth'
import { getRandomUnsplashImageUrl } from '@/lib/utils'

export const POST = withAuth(async (request, { params }) => {
    
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
            { success: false, error: e.message },
            { status: 500 })
        
    }
    
})
