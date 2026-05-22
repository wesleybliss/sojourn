import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth'
import db from '@/db'
import * as schemas from '@/db/schema'
import { eq } from 'drizzle-orm'

export const PUT = withAuth<{ id: string }>(async (request, { params }) => {
    
    const paramsObj = await params
    const placeId = parseInt(paramsObj.id, 10)
    
    try {
        
        const body = await request.json()
        
        if (!placeId)
            return NextResponse.json({ success: false, error: `Invalid place ID: "${placeId}"` }, { status: 400 })
        
        const [place] = await db.select().from(schemas.places).where(eq(schemas.places.id, placeId))
        
        if (!place)
            return NextResponse.json({ success: false, error: 'Place not found' }, { status: 404 })
        
        const [updatedPlace] = await db
            .update(schemas.places)
            .set({
                coverImageUrl: body.coverImageUrl,
            })
            .where(eq(schemas.places.id, placeId))
            .returning()
        
        if (!updatedPlace)
            return NextResponse.json({ success: false, error: 'Place not found' }, { status: 404 })
        
        return NextResponse.json({ success: true, data: updatedPlace, message: 'Place updated successfully' })
        
    } catch (e) {
        
        console.error('Error updating place:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})
