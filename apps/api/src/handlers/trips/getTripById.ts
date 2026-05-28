import tripsRepo from '@repo/shared/db/repos/trips'
import { apiResponse } from '@repo/shared/utils/api'
import { AuthContext, withAuth } from '@repo/shared/utils/auth'
import { VercelRequest, VercelResponse } from '@vercel/node'

export const getTripById = withAuth(async (
    req: VercelRequest,
    res: VercelResponse,
    context: AuthContext,
): Promise<VercelResponse> => {
    
    const tripId = parseInt(req.query.tripId as string, 10)
    
    // @todo auth via context.userId
    
    const trip = await tripsRepo.findOneById(tripId)
    
    return apiResponse.ok(res, trip)
    
})
