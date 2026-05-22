import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth'
import { getRandomUnsplashImageUrl } from '@/utils'

export const POST = withAuth(async (request/* , { params } */) => {
    
    const body = await requeston()
    const { topic } = body
    
    try {
        
        const url = await getRandomUnsplashImageUrl(topic)
        
        return NextResponseon({
            success: true,
            data: url,
        })
        
    } catch (e) {
        
        console.error(`Error getting random photo with topic ${topic}:`, e)
        return NextResponseon(
            { success: false, error: e.message },
            { status: 500 })
        
    }
    
})
