import plansRepo from '@repo/shared/db/repos/plans'
import tripsRepo from '@repo/shared/db/repos/trips'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
    withCounts: z.coerce.boolean().default(false),
    withDetails: z.coerce.boolean().default(false),
})

export const getTrips = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    const { withCounts, withDetails } = querySchema.parse(req.query)
    
    if (withCounts && withDetails) {
        const trips = await tripsRepo.findAllByUserIdWithDetailsAndSegmentCount(
            req.auth.userId,
            plansRepo,
        )
        return apiResponse.ok(res, trips)
    }
    
    if (withDetails) {
        const trips = await tripsRepo.findAllByUserIdWithDetails(
            req.auth.userId,
            plansRepo,
        )
        return apiResponse.ok(res, trips)
    }
    
    if (withCounts) {
        const trips = await tripsRepo.findAllByUserIdWithSegmentCount(req.auth.userId)
        return apiResponse.ok(res, trips)
    }
    
    const trips = await tripsRepo.findAllByUserId(req.auth.userId)
    
    return apiResponse.ok(res, trips)
    
}
