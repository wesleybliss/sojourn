import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { AuthContext, isUserTripMember, withAuth } from '@repo/shared/utils/auth'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { eq } from 'drizzle-orm'

export const deletePlan = withAuth(async (
    req: VercelRequest,
    res: VercelResponse,
    context: AuthContext,
): Promise<VercelResponse> => {
    
    try {
        
        const planId = parseInt(req.query.planId as string, 10)
        
        if (!planId || isNaN(planId))
            return apiResponse.badRequest(res, 'Invalid plan ID')
        
        const [plan] = await db.select()
            .from(schemas.plans)
            .where(eq(schemas.plans.id, planId))
        
        if (!plan)
            return apiResponse.notFound(res, 'Plan')
        
        const isMember = await isUserTripMember(context, plan.tripId)
        
        if (!isMember)
            return apiResponse.forbidden(res)
        
        const [deletedPlan] = await db
            .delete(schemas.plans)
            .where(eq(schemas.plans.id, planId))
            .returning()
        
        if (!deletedPlan)
            return apiResponse.notFound(res, 'Plan')
        
        return apiResponse.okMessage(res, 'Plan deleted successfully')
        
    } catch (e) {
        
        console.error('Error deleting plan:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
