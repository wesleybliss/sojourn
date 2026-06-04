import '@repo/shared/types/express.d'

import { authorize } from '@repo/shared/utils/auth'
import type { NextFunction, Request, Response } from 'express'

export const logger = (req: Request, _res: Response, next: NextFunction) => {
    
    console.log(req.method, req.originalUrl)
    next()
    
}

export const globalErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    
    console.error(err)
    
    res.status(500).json({
        error: 'Internal Server Error',
    })
    
}

export const authentication = async (
    req: Request,
    _res: Response,
    next: NextFunction,
): Promise<void> => {
    
    req.auth = await authorize(req)
    
    next()
    
}
