import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    tripId: z.coerce.number(),
})

const bodySchema = z.object({
    name: z.coerce.string().optional(),
    description: z.coerce.string().optional(),
    coverImageUrl: z.coerce.string().optional(),
})

export const updateTrip = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { tripId } = paramsSchema.parse(req.params)
        
        if (!Object.keys(req.body).length)
            throw new Error('No data provided')
        
        const {
            name,
            description,
            coverImageUrl,
        } = bodySchema.parse(req.body)
        
        const [trip] = await db.select()
            .from(schemas.trips)
            .where(eq(schemas.trips.id, tripId))
        
        if (!trip)
            return apiResponse.notFound(res, 'Trip')
        
        const [updatedTrip] = await db
            .update(schemas.trips)
            .set({
                name,
                description,
                coverImageUrl,
            })
            .where(eq(schemas.trips.id, tripId))
            .returning()
        
        if (!updatedTrip)
            return apiResponse.notFound(res, 'Trip')
        
        return apiResponse.ok(res, {
            message: 'Trip updated successfully',
            data: updatedTrip,
        })
        
    } catch (e) {
        
        console.error('Error updating trip:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
