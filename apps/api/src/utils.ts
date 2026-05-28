import logger from '@repo/shared/utils/logger'
import { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Adds CORS headers to the response.
 * Returns true if the request is an OPTIONS request, and was automatically handled.
 */
const allowedHeaders = [
    'Authorization',
    'Content-Type',
    'Pragma',
    'Cache-Control',
].join(', ')

export const setCorsHeaders = (req: VercelRequest, res: VercelResponse) => {
    
    const log = logger('setCorsHeaders')
    
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders)
    // res.setHeader('Access-Control-Expose-Headers', ELECTRIC_EXPOSE_HEADERS)
    res.setHeader('Access-Control-Max-Age', '86400')
    
    if (req.method === 'OPTIONS') {
        log.d('[OPTIONS] - handling preflight')
        res.status(200).end()
        return true
    }
    
    return false
    
}
