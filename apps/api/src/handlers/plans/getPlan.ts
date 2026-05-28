import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { AuthContext, isUserTripMember, withAuth } from '@repo/shared/utils/auth'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { eq } from 'drizzle-orm'

export const getPlan = withAuth(async (
    req: VercelRequest,
    res: VercelResponse,
    context: AuthContext,
): Promise<VercelResponse> => {
    
    try {
        
        const planId = parseInt(req.query.planId as string, 10)
        const body = req.body
        
        const { tripId } = body
        
        const isMember = await isUserTripMember(context, tripId)
        
        if (!isMember)
            return apiResponse.forbidden(res)
        
        if (!planId || isNaN(planId))
            return apiResponse.badRequest(res, 'Invalid plan ID')
        
        const [plan] = await db.select()
            .from(schemas.plans)
            .where(eq(schemas.plans.id, planId))
        
        if (!plan)
            return apiResponse.notFound(res, 'Plan')
        
        return apiResponse.ok(res, { data: plan })
        
    } catch (e) {
        
        console.error('Error fetching plan:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
