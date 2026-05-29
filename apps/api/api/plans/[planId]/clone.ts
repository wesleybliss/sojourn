import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { clonePlan } from '#handlers/plans/clonePlan'

export const config = {
    runtime: 'nodejs',
}

export default withAuth((
    req: VercelRequest,
    res: VercelResponse,
): VercelResponse | Promise<VercelResponse> => {
    
    switch (req.method) {
        case 'POST': return clonePlan(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
})
