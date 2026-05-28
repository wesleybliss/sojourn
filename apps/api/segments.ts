import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponseDeprecated } from '@repo/shared/utils/api'
import { isUserTripMember, withAuthDeprecated } from '@repo/shared/utils/auth'
import { and, eq, inArray } from 'drizzle-orm'

const handler = async (request: Request, context: { auth: any, params: Promise<any> }) => {
  if (request.method === 'POST') {
    try {
      const body = await request.json()
      
      const {
        tripId,
        planId,
        startDate,
        endDate,
        name,
        color,
      } = body
      
      if (!tripId)
        return apiResponseDeprecated.invalidParams('Param tripId is required')
      
      if (!planId)
        return apiResponseDeprecated.invalidParams('Param planId is required')
      
      if (!name?.length)
        return apiResponseDeprecated.invalidParams('Param name is required')
      
      if (!startDate?.length)
        return apiResponseDeprecated.invalidParams('Param startDate is required')
      
      if (!endDate?.length)
        return apiResponseDeprecated.invalidParams('Param endDate is required')
      
      const isMember = await isUserTripMember(context.auth, tripId)
      
      if (!isMember)
        return apiResponseDeprecated.forbidden()
      
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
      
      return apiResponseDeprecated.ok({
        message: 'Segment created successfully',
        data: createdSegment,
      })
    } catch (e) {
      console.error('Error creating segment:', e)
      return apiResponseDeprecated.internalServerError()
    }
  } else if (request.method === 'DELETE') {
    try {
      const body = await request.json()
      const { tripId, planId, segmentIds } = body
      
      if (!Array.isArray(segmentIds) || !segmentIds.length)
        return apiResponseDeprecated.invalidParams('Param segmentIds is required and must be non-empty array')
      
      if (!tripId)
        return apiResponseDeprecated.invalidParams('Param tripId is required')
      
      if (!planId)
        return apiResponseDeprecated.invalidParams('Param planId is required')
      
      const isMember = await isUserTripMember(context.auth, tripId)
      
      if (!isMember)
        return apiResponseDeprecated.forbidden()
      
      await db.transaction(async tx => {
          await tx.delete(schemas.segments)
              .where(and(
                  eq(schemas.segments.tripId, tripId),
                  eq(schemas.segments.planId, planId),
                  inArray(schemas.segments.id, segmentIds),
              ))
      })
      
      return apiResponseDeprecated.okMessage('Segments deleted successfully')
    } catch (e) {
      console.error('Error deleting segments:', e)
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
