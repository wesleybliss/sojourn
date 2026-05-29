import { apiResponse } from '@repo/shared/utils/api'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { createPlace, getPlaces } from '@/handlers/places'

export const config = {
    runtime: 'nodejs',
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse | undefined> {
    
    switch (req.method) {
        case 'GET': return getPlaces(req, res)
        case 'POST': return createPlace(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
}
