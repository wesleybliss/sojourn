import { apiResponse } from '@repo/shared/utils/api'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { createUser, getUser } from '@/handlers/auth'

export const config = {
    runtime: 'nodejs',
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse | undefined> {
    
    switch (req.method) {
        case 'GET': return getUser(req, res)
        case 'POST': return createUser(req, res)
        default: return apiResponse.internalServerError(res)
    }
}
