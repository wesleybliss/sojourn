import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember } from '@repo/shared/utils/auth'
import { eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    tripId: z.coerce.number(),
    planId: z.coerce.number(),
})

export const getPlan = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { tripId, planId } = paramsSchema.parse(req.params)
        
        const isMember = await isUserTripMember(req.auth, tripId)
        
        if (!isMember)
            return apiResponse.forbidden(res)
        
        if (!planId || isNaN(planId))
            return apiResponse.badRequest(res, 'Invalid plan ID')
        
        const [plan] = await db.select()
            .from(schemas.plans)
            .where(eq(schemas.plans.id, planId))
        
        if (!plan)
            return apiResponse.notFound(res, 'Plan')
        
        return apiResponse.ok(res, { data: plan })
        
    } catch (e) {
        
        console.error('Error fetching plan:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
