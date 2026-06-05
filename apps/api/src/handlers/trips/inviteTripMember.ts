import tripsRepo from '@repo/shared/db/repos/trips'
import usersRepo from '@repo/shared/db/repos/users'
import userTripsRepo from '@repo/shared/db/repos/userTrips'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember } from '@repo/shared/utils/auth'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    tripId: z.coerce.number(),
})

export const inviteTripMember = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { tripId } = paramsSchema.parse(req.params)
        const { inviteeEmail } = req.body
        
        if (!inviteeEmail?.length)
            return apiResponse.invalidParams(res, 'Param "inviteeEmail" is required')
        
        const isMember = await isUserTripMember(req.auth, tripId)
        
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
        
        return apiResponse.ok(res, { trip, inviteeEmail })
        
    } catch (e) {
        
        console.error('Error inviting user to trip:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
