import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { createSegment } from '#handlers/segments/createSegment'
import { deleteSegment } from '#handlers/segments/deleteSegment'
import { getSegments } from '#handlers/segments/getSegments'

export const config = {
    runtime: 'nodejs',
}

export default withAuth((
    req: VercelRequest,
    res: VercelResponse,
): VercelResponse | Promise<VercelResponse> => {
    
    switch (req.method) {
        case 'GET': return getSegments(req, res)
        case 'POST': return createSegment(req, res)
        case 'DELETE': return deleteSegment(req, res)
        default: return apiResponse.internalServerError(res)
    }
    
})
