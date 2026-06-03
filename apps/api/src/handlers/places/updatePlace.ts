import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, withAuth } from '@repo/shared/utils/auth'
import { getUpdatePayload } from '@repo/shared/utils'
import { eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    placeId: z.coerce.number(),
})

export const updatePlace = withAuth(async (
    req: Request,
    res: Response,
    _context: AuthContext,
): Promise<void> => {
    
    const { placeId } = paramsSchema.parse(req.params)
    
    try {
        
        const body = req.body
        
        if (!placeId)
            return apiResponse.badRequest(res, `Invalid place ID: "${placeId}"`)
        
        const [place] = await db.select()
            .from(schemas.places)
            .where(eq(schemas.places.id, placeId))
        
        if (!place)
            return apiResponse.notFound(res, 'Place')
        
        const payload = getUpdatePayload(place, body, ['id'])
        
        const [updatedPlace] = await db
            .update(schemas.places)
            .set(payload)
            .where(eq(schemas.places.id, placeId))
            .returning()
        
        if (!updatedPlace)
            return apiResponse.notFound(res, 'Place')
        
        return apiResponse.ok(res, {
            message: 'Place updated successfully',
            data: updatedPlace,
        })
        
    } catch (e) {
        
        console.error('Error updating place:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
