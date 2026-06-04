import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
    tripId: z.coerce.number(),
    name: z.coerce.string(),
    description: z.coerce.string().nullable(),
})

export const createPlan = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const {
            tripId,
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
