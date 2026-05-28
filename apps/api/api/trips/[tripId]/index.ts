import { apiResponse } from '@repo/shared/utils/api'
import { VercelRequest, VercelResponse } from '@vercel/node'

import { getTripById } from '@/handlers/trips'

export const config = {
    runtime: 'nodejs',
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse | undefined> {
    
    switch (req.method) {
        case 'GET': return getTripById(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
}
