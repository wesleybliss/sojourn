import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
    name: z.coerce.string(),
    description: z.coerce.string().nullable(),
    coverImageUrl: z.coerce.string().nullable(),
})

export const createTrip = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const {
            name,
            description,
            coverImageUrl,
        } = bodySchema.parse(req.body)
        
        const result = await db.transaction(async tx => {
            
            const [createdTrip] = await tx
                .insert(schemas.trips)
                .values({
                    userId: req.auth?.user?.id,
                    name,
                    description,
                    coverImageUrl,
                })
                .returning()
            
            await tx
                .insert(schemas.userTrips)
                .values({
                    userId: req.auth?.user?.id,
                    tripId: createdTrip.id,
                })
            
            return createdTrip
            
        })
        
        return apiResponse.ok(res, {
            message: 'Trip created successfully',
            data: result,
        })
        
    } catch (e) {
        
        console.error('Error creating trip:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
