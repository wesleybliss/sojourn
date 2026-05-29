import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { deletePlan } from '#handlers/plans/deletePlan'
import { getPlan } from '#handlers/plans/getPlan'
import { updatePlan } from '#handlers/plans/updatePlan'

export const config = {
    runtime: 'nodejs',
}

export default withAuth((
    req: VercelRequest,
    res: VercelResponse,
): VercelResponse | Promise<VercelResponse> => {
    
    switch (req.method) {
        case 'GET': return getPlan(req, res)
        case 'PUT': return updatePlan(req, res)
        case 'DELETE': return deletePlan(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
})
