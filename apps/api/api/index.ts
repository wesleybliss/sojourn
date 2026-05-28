import { VercelRequest, VercelResponse } from '@vercel/node'

export const config = {
    runtime: 'nodejs',
}

export default async function handler(
    _req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse | undefined> {
    
    return res.json({
        status: 'ok',
    })
    
}
