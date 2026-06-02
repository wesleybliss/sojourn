import type { ApiResult } from '@repo/shared/types'
import { auth } from '@repo/shared/utils/firebase/client'
import logger from '@repo/shared/utils/logger'
import type { Request, Response } from 'express'

/**
 * Adds CORS headers to the response.
 * Returns true if the request is an OPTIONS request and was automatically handled.
 */
const allowedHeaders = [
    'Authorization',
    'Content-Type',
    'Pragma',
    'Cache-Control',
].join(', ')

export const setCorsHeaders = (req: Request, res: Response) => {
    
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
    ok: <T>(res: Response, data: T, status?: number) => void
    fail: <T>(res: Response, error: string, status: number, data?: T) => void
    okMessage: (res: Response, message: string) => void
    notFound: (res: Response, resource?: string) => void
    badRequest: (res: Response, message?: string) => void
    unauthorized: (res: Response, message?: string) => void
    forbidden: (res: Response, message?: string) => void
    invalidParams: (res: Response, message?: string) => void
    internalServerError: (res: Response, message?: string) => void
}

const apiResponseBase = {
    ok: <T>(res: Response, data: T, status: number = 200): void => {
        res.status(status).json(new ApiResponse(data))
    },
    fail: <T>(res: Response, error: string, status: number, data?: T): void => {
        console.error('apiResponse/fail', error, new Error('apiResponse fail'))
        res.status(status).json(new ApiResponse(data, error))
    },
}

export const apiResponse: ApiResponseHelper = {
    ...apiResponseBase,
    
    // Success helpers
    okMessage: (res: Response, message: string) => {
        apiResponseBase.ok<{ message: string }>(res, { message })
    },
    
    // Failure helpers
    notFound: (res: Response, resource: string = 'Resource') => {
        apiResponseBase.fail(res, `${resource} not found`, 404)
    },
    badRequest: (res: Response, message: string = 'Bad request') => {
        apiResponseBase.fail(res, message, 400)
    },
    unauthorized: (res: Response, message: string = 'Unauthorized') => {
        apiResponseBase.fail(res, message, 401)
    },
    forbidden: (res: Response, message: string = 'Forbidden') => {
        apiResponseBase.fail(res, message, 403)
    },
    invalidParams: (res: Response, message: string = 'Invalid params') => {
        apiResponseBase.fail(res, message, 422)
    },
    internalServerError: (res: Response, message: string = 'Internal server error') => {
        apiResponseBase.fail(res, message ?? 'Unknown error', 500)
    },
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
