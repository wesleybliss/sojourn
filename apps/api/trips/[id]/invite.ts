import db from '@repo/shared/db'
import tripsRepo from '@repo/shared/db/repos/trips'
import usersRepo from '@repo/shared/db/repos/users'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember, withAuth } from '@repo/shared/utils/auth'

const handler = async (request: Request, context: { auth: any, params: Promise<{ id: string }> }) => {
  if (request.method === 'POST') {
    try {
      const paramsObj = await context.params
      const tripId = parseInt(paramsObj.id, 10)
      const { inviteeEmail } = await request.json()

      if (!inviteeEmail?.length)
        return apiResponse.invalidParams('Param "inviteeEmail" is required')

      const isMember = await isUserTripMember(context.auth, tripId)

      if (!isMember)
        return apiResponse.forbidden()

      const invitee = await usersRepo.findOneByEmail(inviteeEmail)

      if (!invitee)
        return apiResponse.notFound('Invitee not found')

      const trip = await tripsRepo.findOneById(tripId)

      if (!trip)
        return apiResponse.notFound('Trip not found')

      await db.insert(schemas.userTrips).values({
        userId: invitee.id,
        tripId: trip.id,
      })

      return apiResponse.ok({
        data: {
          trip,
          inviteeEmail,
        },
      })

    } catch (e) {
      console.error('Error inviting user to trip:', e)
      return apiResponse.internalServerError()
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 })
  }
}

export default withAuth<{ id: string }>(handler)