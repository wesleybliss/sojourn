import plansRepo from '@repo/shared/db/repos/plans'
import tripsRepo from '@repo/shared/db/repos/trips'
import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    tripId: z.coerce.number(),
})

const querySchema = z.object({
    withDetails: z.coerce.boolean().default(false),
})

export const getTrip = withAuth(async (
    req: Request,
    res: Response,
    _context: AuthContext,
): Promise<void> => {
    console.log('wtf', req.params)
    const { tripId } = paramsSchema.parse(req.params)
    const { withDetails } = querySchema.parse(req.query)
    
    // @todo auth via context.userId
    
    const trip = withDetails
        ? await tripsRepo.findOneWithDetails(tripId, plansRepo)
        : await tripsRepo.findOneById(tripId)
    
    return apiResponse.ok(res, trip)
    
})
