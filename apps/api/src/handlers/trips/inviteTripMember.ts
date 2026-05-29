import tripsRepo from '@repo/shared/db/repos/trips'
import usersRepo from '@repo/shared/db/repos/users'
import userTripsRepo from '@repo/shared/db/repos/userTrips'
import { apiResponse } from '@repo/shared/utils/api'
import { AuthContext, isUserTripMember, withAuth } from '@repo/shared/utils/auth'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export const inviteTripMember = withAuth(async (
    req: VercelRequest,
    res: VercelResponse,
    context: AuthContext,
): Promise<VercelResponse> => {
    
    try {
        
        const tripId = parseInt(req.query.tripId as string, 10)
        const { inviteeEmail } = req.body
        
        if (!inviteeEmail?.length)
            return apiResponse.invalidParams(res, 'Param "inviteeEmail" is required')
        
        const isMember = await isUserTripMember(context, tripId)
        
        if (!isMember)
            return apiResponse.forbidden(res)
        
        const invitee = await usersRepo.findOneByEmail(inviteeEmail)
        
        if (!invitee)
            return apiResponse.notFound(res, 'Invitee not found')
        
        const trip = await tripsRepo.findOneById(tripId)
        
        if (!trip)
            return apiResponse.notFound(res, 'Trip not found')
        
        // @todo userTrips repo
        await userTripsRepo.create({
            userId: invitee.id,
            tripId: trip.id,
        })
        
        return apiResponse.ok(res, {
            data: {
                trip,
                inviteeEmail,
            },
        })
        
    } catch (e) {
        
        console.error('Error inviting user to trip:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
