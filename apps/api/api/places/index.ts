import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { createPlace } from '#handlers/places/createPlace'
import { getPlaces } from '#handlers/places/getPlaces'

export const config = {
    runtime: 'nodejs',
}

export default withAuth((
    req: VercelRequest,
    res: VercelResponse,
): VercelResponse | Promise<VercelResponse> => {
    
    switch (req.method) {
        case 'GET': return getPlaces(req, res)
        case 'POST': return createPlace(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
})
