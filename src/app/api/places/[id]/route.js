import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth'
import db from '@/db'
import * as schemas from '@/db/schema'
import { eq } from 'drizzle-orm'

export const PUT = withAuth(async (request, { params }) => {
    
    try {
        
        const { id: placeId } = await params
        const body = await requeston()
        
        if (isNaN(parseInt(placeId, 10)))
            return NextResponseon({ success: false, error: `Invalid place ID: "${placeId}"` }, { status: 400 })
        
        const [place] = await db.select().from(schemas.places).where(eq(schemas.places.id, parseInt(placeId, 10)))
        
        if (!place)
            return NextResponseon({ success: false, error: 'Place not found' }, { status: 404 })
        
        const [updatedPlace] = await db
            .update(schemas.places)
            .set({
                coverImageUrl: body.coverImageUrl,
            })
            .where(eq(schemas.places.id, parseInt(placeId, 10)))
            .returning()
        
        if (!updatedPlace)
            return NextResponseon({ success: false, error: 'Place not found' }, { status: 404 })
        
        return NextResponseon({ success: true, data: updatedPlace, message: 'Place updated successfully' })
        
    } catch (e) {
        
        console.error('Error updating place:', e)
        return NextResponseon({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})
