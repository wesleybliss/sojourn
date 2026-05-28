import { apiResponse } from '@repo/shared/utils/api'
import { VercelRequest, VercelResponse } from '@vercel/node'

import { getPlace, updatePlace } from '@/handlers/places'

export const config = {
    runtime: 'nodejs',
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse | undefined> {
    
    switch (req.method) {
        case 'GET': return getPlace(req, res)
        case 'PUT': return updatePlace(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
}
