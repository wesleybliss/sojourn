import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { getRandomUnsplashImageUrl } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import dayjs from 'dayjs'
import type { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
    teamId: z.coerce.number(),
    name: z.coerce.string(),
    description: z.coerce.string().optional(),
    coverImageUrl: z.coerce.string().optional(),
})

export const createTrip = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const {
            teamId,
            name,
            description,
            coverImageUrl: manualCoverImageUrl,
        } = bodySchema.parse(req.body)
        
        const coverImageUrl = manualCoverImageUrl
            ?? await getRandomUnsplashImageUrl(name)
        
        const result = await db.transaction(async tx => {
            
            const [createdTrip] = await tx
                .insert(schemas.trips)
                .values({
                    teamId: teamId,
                    name,
                    description,
                    coverImageUrl,
                })
                .returning()
            
            const [createdPlan] = await tx
                .insert(schemas.plans)
                .values({
                    tripId: createdTrip.id,
                    name: `Primary ${dayjs().format('YYYY')}`,
                })
                .returning()
            
            return {
                ...createdTrip,
                plans: [createdPlan],
            }
            
        })
        
        return apiResponse.ok(res, result)
        
    } catch (e) {
        
        console.error('Error creating trip:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
