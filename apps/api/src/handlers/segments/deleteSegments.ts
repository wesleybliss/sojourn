import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { and, eq, inArray } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    tripId: z.coerce.number(),
    planId: z.coerce.number(),
})

const bodySchema = z.object({
    segmentIds: z.array(z.coerce.number()),
})

export const deleteSegments = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { tripId, planId } = paramsSchema.parse(req.params)
        const { segmentIds } = bodySchema.parse(req.body)
        
        await db.transaction(async tx => {
            await tx.delete(schemas.segments)
                .where(and(
                    eq(schemas.segments.tripId, tripId),
                    eq(schemas.segments.planId, planId),
                    inArray(schemas.segments.id, segmentIds),
                ))
        })
        
        return apiResponse.okMessage(res, 'Segments deleted successfully')
        
    } catch (e) {
        
        console.error('Error deleting segments:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
