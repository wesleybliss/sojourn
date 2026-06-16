import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { and, eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    teamId: z.coerce.number(),
    tripId: z.coerce.number(),
    planId: z.coerce.number(),
    segmentId: z.coerce.number(),
})

export const deleteSegment = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { teamId, tripId, planId, segmentId } = paramsSchema.parse(req.params)
        
        const [trip] = await db.select()
            .from(schemas.plans)
            .where(and(
                eq(schemas.trips.teamId, teamId),
                eq(schemas.trips.id, tripId),
            ))
        
        if (!trip)
            return apiResponse.notFound(res, 'Trip')
        
        await db.transaction(async tx => {
            await tx.delete(schemas.segments)
                .where(and(
                    eq(schemas.segments.tripId, tripId),
                    eq(schemas.segments.planId, planId),
                    eq(schemas.segments.id, segmentId),
                ))
        })
        
        return apiResponse.okMessage(res, 'Segments deleted successfully')
        
    } catch (e) {
        
        console.error('Error deleting segments:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
