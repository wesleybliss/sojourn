import HttpError from '@repo/shared/errors/HttpError'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'

export const getUser = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { user } = req.auth
        
        return apiResponse.ok(res, {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                photoUrl: user.photoUrl,
                enabled: user.enabled,
            },
            needsInviteCode: !user.enabled,
        })
        
    } catch (e: unknown) {
        
        if (e instanceof HttpError)
            return apiResponse.fail(res, (e as Error).message, e.status)
        
        console.error('Error in GET /api/auth/user:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
