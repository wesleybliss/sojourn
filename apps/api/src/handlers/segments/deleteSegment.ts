import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember } from '@repo/shared/utils/auth'
import { and, eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    tripId: z.coerce.number(),
    planId: z.coerce.number(),
    segmentId: z.coerce.number(),
})

export const deleteSegment = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { tripId, planId, segmentId } = paramsSchema.parse(req.params)
        
        const isMember = await isUserTripMember(req.auth, tripId)
        
        if (!isMember)
            return apiResponse.forbidden(res)
        
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
