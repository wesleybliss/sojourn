import { NextResponse } from 'next/server'
import placesRepo from '@/db/repos/places'
import { withAuth } from '@/lib/auth'
import { getRandomUnsplashImageUrl } from '@/utils'

/**
 * POST /api/places
 * Gets a list of places.
 */
export const GET = withAuth(async () => {
    
    try {
        
        const places = await placesRepo.findAll()
        
        return NextResponseon(
            { success: true, data: places },
            { status: 200 })
        
    } catch (e) {
        
        console.error('Error getting places:', e)
        return NextResponseon({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})

export const POST = withAuth(async request => {
    
    try {
        
        const body = await requeston()
        const { name } = body
        
        if (!name?.length)
            return NextResponseon({
                success: false,
                error: 'Param "name" required',
            }, { status: 422 })
        
        const coverImageUrl = await getRandomUnsplashImageUrl(name)
        
        const newPlace = await placesRepo.create({
            name,
            coverImageUrl,
        })
        
        return NextResponseon(
            { success: true, data: newPlace },
            { status: 200 })
        
    } catch (e) {
        
        console.error('Error creating new place:', e)
        return NextResponseon({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})
