import { apiResponse } from '@repo/shared/utils/api'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { deletePlan } from '#handlers/plans/deletePlan'
import { getPlan } from '#handlers/plans/getPlan'
import { updatePlan } from '#handlers/plans/updatePlan'

export const config = {
    runtime: 'nodejs',
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse | undefined> {
    
    switch (req.method) {
        case 'GET': return getPlan(req, res)
        case 'PUT': return updatePlan(req, res)
        case 'DELETE': return deletePlan(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
}
