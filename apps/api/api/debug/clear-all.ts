import { apiResponse } from '@repo/shared/utils/api'
import { VercelRequest, VercelResponse } from '@vercel/node'

import { clearAll } from '@/handlers/debug'

export const config = {
    runtime: 'nodejs',
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse | undefined> {
    
    switch (req.method) {
        case 'POST': return clearAll(req, res)
        default: return apiResponse.internalServerError(res)
    }
}