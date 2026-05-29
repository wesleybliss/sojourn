import { apiResponse } from '@repo/shared/utils/api'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { clonePlan } from '#handlers/plans/clonePlan'

export const config = {
    runtime: 'nodejs',
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse | undefined> {
    
    switch (req.method) {
        case 'POST': return clonePlan(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
}
