import { apiResponse } from '@repo/shared/utils/api'
import { VercelRequest, VercelResponse } from '@vercel/node'

import { deletePlan, getPlan, updatePlan } from '@/handlers/plans'

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
