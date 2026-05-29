import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { getPlace } from '#handlers/places/getPlace'
import { updatePlace } from '#handlers/places/updatePlace'

export const config = {
    runtime: 'nodejs',
}

export default withAuth((
    req: VercelRequest,
    res: VercelResponse,
): VercelResponse | Promise<VercelResponse> => {
    
    switch (req.method) {
        case 'GET': return getPlace(req, res)
        case 'PUT': return updatePlace(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
})
