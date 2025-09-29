import { NextResponse } from 'next/server'
import placesRepo from '@/db/repos/places'
import { withAuth } from '@/lib/auth'
import { getRandomUnsplashImageUrl } from '@/lib/utils'

/**
 * POST /api/places
 * Gets a list of places.
 */
export const GET = withAuth(async () => {
    
    try {
        
        const places = await placesRepo.findAll()
        
        return NextResponse.json(
            { success: true, data: places },
            { status: 200 })
        
    } catch (e) {
        
        console.error('Error getting places:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})

export const POST = withAuth(async request => {
    
    try {
        
        const body = await request.json()
        const { name } = body
        
        if (!name?.length)
            return NextResponse.json({
                success: false,
                error: 'Param "name" required',
            }, { status: 422 })
        
        const coverImageUrl = await getRandomUnsplashImageUrl(name)
        
        const newPlace = await placesRepo.create({
            name,
            coverImageUrl,
        })
        
        return NextResponse.json(
            { success: true, data: newPlace },
            { status: 200 })
        
    } catch (e) {
        
        console.error('Error creating new place:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})
