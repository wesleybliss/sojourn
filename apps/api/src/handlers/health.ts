import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'

export const getIndex = async (
    _req: Request,
    res: Response,
): Promise<void> => {
    
    return apiResponse.ok(res, {
        status: 'OK',
    })
    
}
