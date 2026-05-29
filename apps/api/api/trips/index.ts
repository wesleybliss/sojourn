import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { getTrips } from '#handlers/trips/getTrips'

export const config = {
    runtime: 'nodejs',
}

export default withAuth((
    req: VercelRequest,
    res: VercelResponse,
    context: AuthContext,
): VercelResponse | Promise<VercelResponse> => {
    
    switch (req.method) {
        case 'GET': return getTrips(req, res, context)
        default: return apiResponse.internalServerError(res)
    }
    
})
