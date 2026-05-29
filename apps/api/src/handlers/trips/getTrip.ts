import plansRepo from '@repo/shared/db/repos/plans'
import tripsRepo from '@repo/shared/db/repos/trips'
import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'

const querySchema = z.object({
    tripId: z.coerce.number(),
    withDetails: z.coerce.boolean(),
})

export const getTrip = withAuth(async (
    req: VercelRequest,
    res: VercelResponse,
    _context: AuthContext,
): Promise<VercelResponse> => {
    
    const { tripId, withDetails } = querySchema.parse(req.query)
    
    // @todo auth via context.userId
    
    const trip = withDetails
        ? await tripsRepo.findOneWithDetails(tripId, plansRepo)
        : await tripsRepo.findOneById(tripId)
    
    return apiResponse.ok(res, trip)
    
})
