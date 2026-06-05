import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    tripId: z.coerce.number(),
})

const bodySchema = z.object({
    name: z.coerce.string(),
    description: z.coerce.string().optional(),
})

export const createPlan = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { tripId } = paramsSchema.parse(req.params)
        
        const {
            name,
            description,
        } = bodySchema.parse(req.body)
        
        const [createdPlan] = await db
            .insert(schemas.plans)
            .values({
                tripId,
                name,
                description,
            })
            .returning()
        
        return apiResponse.ok(res, {
            message: 'Plan created successfully',
            data: createdPlan,
        })
        
    } catch (e) {
        
        console.error('Error creating plan:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
