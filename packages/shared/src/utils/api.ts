import { ApiResult } from '@shared/types'
import { auth } from '@shared/utils/firebase/client'

export class ApiResponse<T> implements ApiResult<T> {
    
    public data?: T | undefined | null
    public error?: string | undefined
    public count?: number | undefined
    public message?: string | undefined
    
    constructor(
        data: T | undefined | null,
        error: string | undefined,
        count: number | undefined,
        message: string | undefined,
    ) {
        this.data = data
        this.error = error
        this.count = count
        this.message = message
    }
    
}

type ApiResponseHelper = {
    ok: <T>(data: ApiResponse<T>, status?: number) => Response
    fail: <T>(error: string, status: number, data?: ApiResponse<T>) => Response
    okMessage: (message: string) => Response
    notFound: (resource?: string) => Response
    badRequest: (message?: string) => Response
    unauthorized: (message?: string) => Response
    forbidden: (message?: string) => Response
    invalidParams: (message?: string) => Response
    internalServerError: (message?: string) => Response
}

const apiResponseBase = {
    ok: <T>(data: ApiResponse<T>, status: number = 200): Response => new Response(
        JSON.stringify(data),
        { status, headers: { 'Content-Type': 'application/json' } },
    ),
    fail: <T>(error: string, status: number, data?: ApiResponse<T>): Response => new Response(
        JSON.stringify({ error, ...data }),
        { status, headers: { 'Content-Type': 'application/json' } },
    ),
}

export const apiResponse: ApiResponseHelper = {
    ...apiResponseBase,
    
    // Success helpers
    okMessage: (message: string) =>
        apiResponseBase.ok<{ message: string }>({ message }),
    
    // Failure helpers
    notFound: (resource: string = 'Resource') =>
        apiResponseBase.fail(`${resource} not found`, 404),
    badRequest: (message: string = 'Bad request') =>
        apiResponseBase.fail(message, 400),
    unauthorized: (message: string = 'Unauthorized') =>
        apiResponseBase.fail(message, 401),
    forbidden: (message: string = 'Forbidden') =>
        apiResponseBase.fail(message, 403),
    invalidParams: (message: string = 'Invalid params') =>
        apiResponseBase.fail(message, 422),
    internalServerError: (message: string = 'Internal server error') =>
        apiResponseBase.fail(message ?? 'Unknown error', 500),
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
    
    const response = await fetchWithAuth(url, {
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
