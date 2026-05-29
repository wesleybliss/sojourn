import { apiResponse } from '@repo/shared/utils/api'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { createSegment } from '#handlers/segments/createSegment'
import { deleteSegment } from '#handlers/segments/deleteSegment'
import { getSegments } from '#handlers/segments/getSegments'

export const config = {
    runtime: 'nodejs',
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse | undefined> {
    
    switch (req.method) {
        case 'GET': return getSegments(req, res)
        case 'POST': return createSegment(req, res)
        case 'DELETE': return deleteSegment(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
}
