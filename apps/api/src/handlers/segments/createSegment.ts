import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, isUserTripMember, withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export const createSegment = withAuth(async (
    req: VercelRequest,
    res: VercelResponse,
    context: AuthContext,
): Promise<VercelResponse> => {
    
    try {
        
        const {
            tripId,
            planId,
            startDate,
            endDate,
            name,
            color,
        } = req.body
        
        if (!tripId)
            return apiResponse.invalidParams(res, 'Param tripId is required')
        
        if (!planId)
            return apiResponse.invalidParams(res, 'Param planId is required')
        
        if (!name?.length)
            return apiResponse.invalidParams(res, 'Param name is required')
        
        if (!startDate?.length)
            return apiResponse.invalidParams(res, 'Param startDate is required')
        
        if (!endDate?.length)
            return apiResponse.invalidParams(res, 'Param endDate is required')
        
        const isMember = await isUserTripMember(context, tripId)
        
        if (!isMember)
            return apiResponse.forbidden(res)
        
        const [createdSegment] = await db
            .insert(schemas.segments)
            .values({
                tripId,
                planId,
                startDate,
                endDate,
                name,
                color,
            })
            .returning()
        
        return apiResponse.ok(res, {
            message: 'Segment created successfully',
            data: createdSegment,
        })
        
    } catch (e) {
        
        console.error('Error creating segment:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
