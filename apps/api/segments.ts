import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember, withAuth } from '@repo/shared/utils/auth'
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
        return apiResponse.invalidParams('Param tripId is required')
      
      if (!planId)
        return apiResponse.invalidParams('Param planId is required')
      
      if (!name?.length)
        return apiResponse.invalidParams('Param name is required')
      
      if (!startDate?.length)
        return apiResponse.invalidParams('Param startDate is required')
      
      if (!endDate?.length)
        return apiResponse.invalidParams('Param endDate is required')
      
      const isMember = await isUserTripMember(context.auth, tripId)
      
      if (!isMember)
        return apiResponse.forbidden()
      
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
      
      return apiResponse.ok({
        message: 'Segment created successfully',
        data: createdSegment,
      })
    } catch (e) {
      console.error('Error creating segment:', e)
      return apiResponse.internalServerError()
    }
  } else if (request.method === 'DELETE') {
    try {
      const body = await request.json()
      const { tripId, planId, segmentIds } = body
      
      if (!Array.isArray(segmentIds) || !segmentIds.length)
        return apiResponse.invalidParams('Param segmentIds is required and must be non-empty array')
      
      if (!tripId)
        return apiResponse.invalidParams('Param tripId is required')
      
      if (!planId)
        return apiResponse.invalidParams('Param planId is required')
      
      const isMember = await isUserTripMember(context.auth, tripId)
      
      if (!isMember)
        return apiResponse.forbidden()
      
      await db.transaction(async tx => {
          await tx.delete(schemas.segments)
              .where(and(
                  eq(schemas.segments.tripId, tripId),
                  eq(schemas.segments.planId, planId),
                  inArray(schemas.segments.id, segmentIds),
              ))
      })
      
      return apiResponse.okMessage('Segments deleted successfully')
    } catch (e) {
      console.error('Error deleting segments:', e)
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