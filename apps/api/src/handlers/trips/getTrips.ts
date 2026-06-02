import tripsRepo from '@repo/shared/db/repos/trips'
import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { Request, Response } from 'express'

export const getTrips = withAuth(async (
    _req: Request,
    res: Response,
    context: AuthContext,
): Promise<void> => {
    
    const trips = await tripsRepo.findAllByUserId(context.userId)
    
    /*return res.json({
        data: trips,
    })*/
    
    return apiResponse.ok(res, trips)
    
})
