import db from '@repo/shared/db/index'
import * as schemas from '@repo/shared/db/schema'
import { apiResponseDeprecated } from '@repo/shared/utils/api'
import { isUserTripMember, withAuthDeprecated } from '@repo/shared/utils/auth'
import { eq } from 'drizzle-orm'

const handler = async (request: Request, context: { auth: any, params: Promise<{ planId: string }> }) => {
  if (request.method === 'GET') {
    try {
      const { planId } = await context.params
      const body = await request.json()
      
      const { tripId } = body
      
      const isMember = await isUserTripMember(context.auth, tripId)
      
      if (!isMember)
        return apiResponseDeprecated.forbidden()
      
      if (!planId || isNaN(parseInt(planId, 10)))
        return apiResponseDeprecated.badRequest('Invalid plan ID')
      
      const [plan] = await db.select()
          .from(schemas.plans)
          .where(eq(schemas.plans.id, parseInt(planId, 10)))
      
      if (!plan)
        return apiResponseDeprecated.notFound('Plan')
      
      return apiResponseDeprecated.ok({ data: plan })
    } catch (e) {
      console.error('Error fetching plan:', e)
      return apiResponseDeprecated.internalServerError()
    }
  } else if (request.method === 'PUT') {
    try {
      const { planId } = await context.params
      const body = await request.json()
      
      const tripId = body.tripId
      
      if (!planId || isNaN(parseInt(planId, 10)))
        return apiResponseDeprecated.invalidParams('Plan')
      
      const isMember = await isUserTripMember(context.auth, tripId)
      
      if (!isMember)
        return apiResponseDeprecated.forbidden()
      
      const [plan] = await db.select()
          .from(schemas.plans)
          .where(eq(schemas.plans.id, parseInt(planId, 10)))
      
      if (!plan)
        return apiResponseDeprecated.notFound('Plan')
      
      const [updatedPlan] = await db
          .update(schemas.plans)
          .set({
            name: body.name,
            description: body.description,
          })
          .where(eq(schemas.plans.id, parseInt(planId, 10)))
          .returning()
      
      if (!updatedPlan)
        return apiResponseDeprecated.notFound('Plan')
      
      return apiResponseDeprecated.ok({
        message: 'Plan updated successfully',
        data: updatedPlan,
      })
    } catch (e) {
      console.error('Error updating plan:', e)
      return apiResponseDeprecated.internalServerError()
    }
  } else if (request.method === 'DELETE') {
    try {
      const { planId } = await context.params
      
      if (!planId || isNaN(parseInt(planId, 10)))
        return apiResponseDeprecated.invalidParams('Invalid plan ID')
      
      const [plan] = await db
          .select()
          .from(schemas.plans)
          .where(eq(schemas.plans.id, parseInt(planId, 10)))
      
      if (!plan)
        return apiResponseDeprecated.notFound('Plan')
      
      const isMember = await isUserTripMember(context.auth, plan.tripId)
      
      if (!isMember)
        return apiResponseDeprecated.forbidden()
      
      const [deletedPlan] = await db
          .delete(schemas.plans)
          .where(eq(schemas.plans.id, parseInt(planId, 10)))
          .returning()
      
      if (!deletedPlan)
        return apiResponseDeprecated.notFound('Plan')
      
      return apiResponseDeprecated.okMessage('Plan deleted successfully')
    } catch (e) {
      console.error('Error deleting plan:', e)
      return apiResponseDeprecated.internalServerError()
    }
  } else {
    return new Response(
      JSON.stringify({ success: false, error: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export default withAuthDeprecated(handler)
