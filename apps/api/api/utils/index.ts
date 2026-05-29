import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { getRandomPhoto } from '#handlers/utils/getRandomPhoto'

export const config = {
    runtime: 'nodejs',
}

export default withAuth((
    req: VercelRequest,
    res: VercelResponse,
): VercelResponse | Promise<VercelResponse> => {
    
    switch (req.method) {
        case 'GET': return getRandomPhoto(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
})
