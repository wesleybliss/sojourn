import db from '@repo/shared/db'
import tripsRepo from '@repo/shared/db/repos/trips'
import usersRepo from '@repo/shared/db/repos/users'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember,withAuth } from '@repo/shared/utils/auth'

/**
 * POST /api/trips/invite
 * Adds another user to a trip.
 */
export const POST = withAuth<{ id: string }>(async (request, { params, auth }) => {
    
    try {
        
        const { id } = await params
        const { inviteeEmail } = await request.json()
        
        if (!inviteeEmail?.length)
            return apiResponse.invalidParams('Param "inviteeEmail" is required')
        
        const isMember = await isUserTripMember(auth, parseInt(id, 10))
        
        if (!isMember)
            return apiResponse.forbidden()
        
        const invitee = await usersRepo.findOneByEmail(inviteeEmail)
        
        if (!invitee)
            return apiResponse.notFound('Invitee not found')
        
        const trip = await tripsRepo.findOneById(parseInt(id, 10))
        
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
    
})
