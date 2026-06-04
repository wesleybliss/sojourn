import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { omit } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { nanoid } from 'nanoid'

export const clonePlan = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const planId = parseInt(req.query.planId as string, 10)
        
        if (isNaN(planId))
            return apiResponse.badRequest(res, `Invalid plan ID: "${planId}"`)
        
        const [plan] = await db.select()
            .from(schemas.plans)
            .where(eq(schemas.plans.id, planId))
        
        if (!plan)
            return apiResponse.notFound(res, 'Plan')
        
        const result = await db.transaction(async tx => {
            
            const [clonedPlan] = await tx
                .insert(schemas.plans)
                .values({
                    tripId: plan.tripId,
                    name: `${plan.name}-${nanoid()}`,
                    description: plan.description,
                })
                .returning()
            
            const segments = await db.select()
                .from(schemas.segments)
                .where(eq(schemas.segments.planId, planId))
            
            const segmentInserts = segments.map(it => tx
                .insert(schemas.segments)
                .values({
                    ...omit(it, ['id', 'planId'] as const),
                    planId: clonedPlan.id,
                }))
            
            await Promise.all(segmentInserts)
            
            return clonedPlan
            
        })
        
        return apiResponse.ok(res, {
            message: 'Plan cloned successfully',
            data: result,
        })
        
    } catch (e) {
        
        console.error('Error cloning plan:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
