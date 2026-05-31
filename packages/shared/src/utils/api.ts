import type { ApiResult } from '@repo/shared/types'
import { auth } from '@repo/shared/utils/firebase/client'
import logger from '@repo/shared/utils/logger'
import type { VercelRequest, VercelResponse } from '@vercel/node'

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
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders)
    // res.setHeader('Access-Control-Expose-Headers', ELECTRIC_EXPOSE_HEADERS)
    res.setHeader('Access-Control-Max-Age', '86400')
    
    if (req.method === 'OPTIONS') {
        log.d('[OPTIONS] - handling preflight')
        return res.status(200).end()
    }
    
    return false
    
}

export class ApiResponse<T> implements ApiResult<T> {
    
    public data?: T | undefined | null
    public error?: string | undefined
    public count?: number | undefined
    public message?: string | undefined
    
    constructor(
        data?: T | undefined | null,
        error?: string | undefined,
        count?: number | undefined,
        message?: string | undefined,
    ) {
        this.data = data
        this.error = error
        this.count = count
        this.message = message
    }
    
}

type ApiResponseHelper = {
    ok: <T>(res: VercelResponse, data: T, status?: number) => VercelResponse
    fail: <T>(res: VercelResponse, error: string, status: number, data?: T) => VercelResponse
    okMessage: (res: VercelResponse, message: string) => VercelResponse
    notFound: (res: VercelResponse, resource?: string) => VercelResponse
    badRequest: (res: VercelResponse, message?: string) => VercelResponse
    unauthorized: (res: VercelResponse, message?: string) => VercelResponse
    forbidden: (res: VercelResponse, message?: string) => VercelResponse
    invalidParams: (res: VercelResponse, message?: string) => VercelResponse
    internalServerError: (res: VercelResponse, message?: string) => VercelResponse
}

const apiResponseBase = {
    ok: <T>(res: VercelResponse, data: T, status: number = 200): VercelResponse =>
        res.status(status).json(new ApiResponse(data)),
    fail: <T>(res: VercelResponse, error: string, status: number, data?: T): VercelResponse => {
        console.error('apiResponse/fail', error, new Error('apiResponse fail'))
        return res.status(status).json(new ApiResponse(data, error))
    },
}

export const apiResponse: ApiResponseHelper = {
    ...apiResponseBase,
    
    // Success helpers
    okMessage: (res: VercelResponse, message: string) =>
        apiResponseBase.ok<{ message: string }>(res, { message }),
    
    // Failure helpers
    notFound: (res: VercelResponse, resource: string = 'Resource') =>
        apiResponseBase.fail(res, `${resource} not found`, 404),
    badRequest: (res: VercelResponse, message: string = 'Bad request') =>
        apiResponseBase.fail(res, message, 400),
    unauthorized: (res: VercelResponse, message: string = 'Unauthorized') =>
        apiResponseBase.fail(res, message, 401),
    forbidden: (res: VercelResponse, message: string = 'Forbidden') =>
        apiResponseBase.fail(res, message, 403),
    invalidParams: (res: VercelResponse, message: string = 'Invalid params') =>
        apiResponseBase.fail(res, message, 422),
    internalServerError: (res: VercelResponse, message: string = 'Internal server error') =>
        apiResponseBase.fail(res, message ?? 'Unknown error', 500),
}

/**
 * Makes an authenticated API request with Firebase ID token
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    
    const user = auth.currentUser
    
    if (!user) {
        throw new Error('User not authenticated')
    }
    
    const token = await user.getIdToken()
    
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    }
    
    return fetch(url, {
        ...options,
        headers,
    })
    
}

/**
 * Makes an authenticated API request and returns JSON
 */
export async function fetchJSON<T>(url: string, options: RequestInit = {}): Promise<ApiResult<T | null>> {
    
    const fullUrl = url.startsWith('http')
        ? url
        : `${import.meta.env.VITE_API_BASE_URL}/api/${url}`
    
    const response = await fetchWithAuth(fullUrl, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })
    
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }))
        
        throw new Error(error.error || `HTTP ${response.status}`)
    }
    
    return response.json()
    
}
