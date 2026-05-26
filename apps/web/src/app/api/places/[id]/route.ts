import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import { eq } from 'drizzle-orm'

export const PUT = withAuth<{ id: string }>(async (request, { params }) => {
    
    const paramsObj = await params
    const placeId = parseInt(paramsObj.id, 10)
    
    try {
        
        const body = await request.json()
        
        if (!placeId)
            return apiResponse.badRequest(`Invalid place ID: "${placeId}"`)
        
        const [place] = await db.select()
            .from(schemas.places)
            .where(eq(schemas.places.id, placeId))
        
        if (!place)
            return apiResponse.notFound('Place')
        
        const [updatedPlace] = await db
            .update(schemas.places)
            .set({
                coverImageUrl: body.coverImageUrl,
            })
            .where(eq(schemas.places.id, placeId))
            .returning()
        
        if (!updatedPlace)
            return apiResponse.notFound('Place')
        
        return apiResponse.ok({
            message: 'Place updated successfully',
            data: {
                place: updatedPlace,
            },
        })
        
    } catch (e) {
        
        console.error('Error updating place:', e)
        return apiResponse.internalServerError()
        
    }
    
})
