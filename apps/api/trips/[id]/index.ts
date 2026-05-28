import plansRepo from '@repo/shared/db/repos/plans'
import tripsRepo from '@repo/shared/db/repos/trips'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember, withAuth } from '@repo/shared/utils/auth'

const handler = async (request: Request, context: { auth: any, params: Promise<{ id: string }> }) => {
  const paramsObj = await context.params
  const id = parseInt(paramsObj.id, 10)

  if (request.method === 'GET') {
    /**
     * GET /api/trips/[id]
     * Returns a single trip by ID.
     */
    try {
      const { searchParams } = new URL(request.url)
      const withDetails = searchParams.get('withDetails')

      const isMember = await isUserTripMember(context.auth, id)

      if (!isMember)
        return apiResponse.forbidden()

      const trip = withDetails
        ? await tripsRepo.findOneWithDetails(id, plansRepo)
        : await tripsRepo.findOneById(id)

      if (!trip)
        return apiResponse.notFound('Trip not found')

      return apiResponse.ok({ data: trip })
    } catch (e) {
      console.error(`Error getting trip ${id}:`, e)
      return apiResponse.internalServerError()
    }
  } else if (request.method === 'PUT') {
    /**
     * PUT /api/trips/[id]
     * Updates a trip by ID.
     */
    try {
      const body = await request.json()

      const isMember = await isUserTripMember(context.auth, id)

      if (!isMember)
        return apiResponse.forbidden()

      const updatedTrip = await tripsRepo.updateById(id, body)

      if (!updatedTrip)
        return apiResponse.notFound('Trip not found')

      return apiResponse.ok({
        message: 'Trip updated successfully',
        data: updatedTrip,
      })
    } catch (e) {
      console.error(`Error updating trip ${id}:`, e)
      return apiResponse.internalServerError()
    }
  } else if (request.method === 'DELETE') {
    /**
     * DELETE /api/trips/[id]
     * Deletes a trip by ID.
     */
    try {
      const isMember = await isUserTripMember(context.auth, id)

      if (!isMember)
        return apiResponse.forbidden()

      await tripsRepo.deleteById(id)

      return apiResponse.okMessage('Trip deleted successfully')
    } catch (e) {
      console.error(`Error deleting trip ${id}:`, e)
      return apiResponse.internalServerError()
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 })
  }
}

export default withAuth<{ id: string }>(handler)