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

export const deletePlan = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { tripId, planId } = paramsSchema.parse(req.params)
        
        if (!planId || isNaN(planId))
            return apiResponse.badRequest(res, 'Invalid plan ID')
        
        const [plan] = await db.select()
            .from(schemas.plans)
            .where(eq(schemas.plans.id, planId))
        
        if (!plan)
            return apiResponse.notFound(res, 'Plan')
        
        const isMember = await isUserTripMember(req.auth, tripId)
        
        if (!isMember)
            return apiResponse.forbidden(res)
        
        const [deletedPlan] = await db
            .delete(schemas.plans)
            .where(eq(schemas.plans.id, planId))
            .returning()
        
        if (!deletedPlan)
            return apiResponse.notFound(res, 'Plan')
        
        return apiResponse.okMessage(res, 'Plan deleted successfully')
        
    } catch (e) {
        
        console.error('Error deleting plan:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
