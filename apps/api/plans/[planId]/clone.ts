import db from '@repo/shared/db/index'
import * as schemas from '@repo/shared/db/schema'
import { omit } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

const handler = async (request: Request, context: { auth: any, params: Promise<{ planId: string }> }) => {
  if (request.method === 'POST') {
    try {
      const { planId } = await context.params
      
      if (isNaN(parseInt(planId, 10)))
        return apiResponse.badRequest(`Invalid plan ID: "${planId}"`)
      
      const [plan] = await db.select()
          .from(schemas.plans)
          .where(eq(schemas.plans.id, parseInt(planId, 10)))
      
      if (!plan)
        return apiResponse.notFound('Plan')
      
      const result = await db.transaction(async tx => {
          const [clonedPlan] = await tx
              .insert(schemas.plans)
              .values({
                  tripId: plan.tripId,
                  name: `${plan.name}-${nanoid()}`,
                  description: plan.description,
              })
              .returning()
          
          const segments = await db.select()
              .from(schemas.segments)
              .where(eq(schemas.segments.planId, parseInt(planId, 10)))
          
          const segmentInserts = segments.map(it => tx
              .insert(schemas.segments)
              .values({
                  ...omit(it, ['id', 'planId']),
                  planId: clonedPlan.id,
              }))
          
          await Promise.all(segmentInserts)
          
          return clonedPlan
      })
      
      return apiResponse.ok({
          message: 'Plan cloned successfully',
          data: result,
      })
    } catch (e) {
      console.error('Error updating plan:', e)
      return apiResponse.internalServerError()
    }
  } else {
    return new Response(
      JSON.stringify({ success: false, error: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export default withAuth(handler)