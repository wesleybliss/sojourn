import db from '@repo/shared/db/index'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { AuthContext, isUserTripMember, withAuth } from '@repo/shared/utils/auth'

const handler = async (request: Request, context: { auth: AuthContext, params: Promise<any> }) => {
  if (request.method === 'POST') {
    try {
      const body = await request.json()
      
      const tripId = body.tripId
      const name = body.name?.trim() || ''
      const description = body.description?.trim() || null
      
      if (!tripId)
        return apiResponse.invalidParams('Trip ID is required')
      
      if (!name)
        return apiResponse.invalidParams('Name is required')
      
      const isMember = await isUserTripMember(context.auth, tripId)
      
      if (!isMember)
        return apiResponse.forbidden()
      
      const [createdPlan] = await db
          .insert(schemas.plans)
          .values({
            tripId: parseInt(tripId, 10),
            name,
            description,
          })
          .returning()
      
      return apiResponse.ok({
        message: 'Plan created successfully',
        data: createdPlan,
      })
    } catch (e) {
      console.error('Error creating plan:', e)
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