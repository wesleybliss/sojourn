import db from '@repo/shared/db/index'
import plansRepo from '@repo/shared/db/repos/plans'
import segmentsRepo from '@repo/shared/db/repos/segments'
import tripsRepo from '@repo/shared/db/repos/trips'
import * as schemas from '@repo/shared/db/schema'
import { createTripRequestSchema } from '@repo/shared/types'
import { apiResponseDeprecated } from '@repo/shared/utils/api'
import { withAuthDeprecated } from '@repo/shared/utils/auth'
import dayjs from 'dayjs'

const handler = async (request: Request, context: { auth: any, params: Promise<any> }) => {
  if (request.method === 'GET') {
    try {
      const { userId } = context.auth
      
      const { searchParams } = new URL(request.url)
      const withCounts = searchParams.get('withCounts') === 'true'
      const withDetails = searchParams.get('withDetails') === 'true'
      
      const trips = withDetails
          ? withCounts
              ? await tripsRepo.findAllByUserIdWithDetailsAndSegmentCount(userId, plansRepo)
              : await tripsRepo.findAllByUserIdWithDetails(userId, plansRepo)
          : withCounts
              ? await tripsRepo.findAllByUserIdWithSegmentCount(userId, segmentsRepo)
              : await tripsRepo.findAllByUserId(userId)
      
      return apiResponseDeprecated.ok({
        data: trips,
        count: trips?.length || 0,
      })
    } catch (e) {
      console.error('Error getting trips:', e)
      return apiResponseDeprecated.internalServerError()
    }
  } else if (request.method === 'POST') {
    try {
      const { userId } = context.auth
      
      const tripData = createTripRequestSchema.parse(
        await request.json(),
      )
      
      const newTripPayload = {
        userId,
        name: tripData.name || 'Untitled Trip',
        description: tripData.description || '',
        /*startDate: tripData.startDate || null,
        endDate: tripData.endDate || null,*/
        coverImageUrl: tripData.coverImageUrl || null,
      }
      
      // Create trip
      const trip = await tripsRepo.create(newTripPayload)
      
      // Link user to trip
      await db.insert(schemas.userTrips).values({
        userId,
        tripId: trip.id,
      })
      
      // Create default plan
      const plan = await plansRepo.create({
        tripId: trip.id,
        name: dayjs().format('MMMM YYYY'),
        description: '',
      })
      
      // Create default segment
      await segmentsRepo.create({
        tripId: trip.id,
        planId: plan.id,
        name: 'First Stop',
        description: '',
        // order: 1,
        startDate: dayjs().toDate(),
        endDate: dayjs().add(5, 'day').toDate(),
        color: 'bg-blue-500',
      })
      
      return apiResponseDeprecated.ok({
        data: trip,
        message: 'Trip created successfully',
      }, 201)
    } catch (e) {
      console.error('Error creating trip:', e)
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
