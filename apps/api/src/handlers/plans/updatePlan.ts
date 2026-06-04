import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember } from '@repo/shared/utils/auth'
import { eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    planId: z.coerce.number(),
})

export const updatePlan = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { planId } = paramsSchema.parse(req.params)
        const body = req.body
        
        const tripId = body.tripId
        
        if (!planId || isNaN(planId))
            return apiResponse.badRequest(res, 'Invalid plan ID')
        
        const isMember = await isUserTripMember(req.auth, tripId)
        
        if (!isMember)
            return apiResponse.forbidden(res)
        
        const [plan] = await db.select()
            .from(schemas.plans)
            .where(eq(schemas.plans.id, planId))
        
        if (!plan)
            return apiResponse.notFound(res, 'Plan')
        
        const [updatedPlan] = await db
            .update(schemas.plans)
            .set({
                name: body.name,
                description: body.description,
            })
            .where(eq(schemas.plans.id, planId))
            .returning()
        
        if (!updatedPlan)
            return apiResponse.notFound(res, 'Plan')
        
        return apiResponse.ok(res, {
            message: 'Plan updated successfully',
            data: updatedPlan,
        })
        
    } catch (e) {
        
        console.error('Error updating plan:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
