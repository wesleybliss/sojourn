import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { withAuth } from '@repo/shared/utils/auth'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

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
