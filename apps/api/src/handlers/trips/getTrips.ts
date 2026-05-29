import tripsRepo from '@repo/shared/db/repos/trips'
import { apiResponse } from '@repo/shared/utils/api'
import { AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export const getTrips = withAuth(async (
    _req: VercelRequest,
    res: VercelResponse,
    context: AuthContext,
): Promise<VercelResponse> => {
    
    const trips = await tripsRepo.findAllByUserId(context.userId)
    
    /*return res.json({
        data: trips,
    })*/
    
    return apiResponse.ok(res, trips)
    
})
