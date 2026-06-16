import plansRepo from '@repo/shared/db/repos/plans'
import segmentsRepo from '@repo/shared/db/repos/segments'
import tripsRepo from '@repo/shared/db/repos/trips'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    teamId: z.coerce.number(),
})

const querySchema = z.object({
    withCounts: z.coerce.boolean().default(false),
    withDetails: z.coerce.boolean().default(false),
})

export const getTrips = async (
    req: Request,
    res: Response,
): Promise<void> => {
    console.log('wtf', req.path, req.params)
    const { teamId } = paramsSchema.parse(req.params)
    const { withCounts, withDetails } = querySchema.parse(req.query)
    
    if (withCounts && withDetails) {
        const trips = await tripsRepo.findAllByUserIdWithDetailsAndSegmentCount(
            req.auth.userId,
            teamId,
            plansRepo,
        )
        return apiResponse.ok(res, trips)
    }
    
    if (withDetails) {
        const trips = await tripsRepo.findAllByUserIdWithDetails(
            req.auth.userId,
            teamId,
            plansRepo,
        )
        return apiResponse.ok(res, trips)
    }
    
    if (withCounts) {
        const trips = await tripsRepo.findAllByUserIdWithSegmentCount(
            req.auth.userId,
            teamId,
            segmentsRepo,
        )
        return apiResponse.ok(res, trips)
    }
    
    const trips = await tripsRepo.findAllByUserId(req.auth.userId, teamId)
    
    return apiResponse.ok(res, trips)
    
}
