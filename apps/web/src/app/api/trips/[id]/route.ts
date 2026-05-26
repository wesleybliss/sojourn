import plansRepo from '@repo/shared/db/repos/plans'
import tripsRepo from '@repo/shared/db/repos/trips'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember, withAuth } from '@repo/shared/utils/auth'

/**
 * GET /api/trips/[id]
 * Returns a single trip by ID.
 */
export const GET = withAuth<{ id: string }>(async (request, { params, auth }) => {
    
    const paramsObj = await params
    const id = parseInt(paramsObj.id, 10)
    
    try {
        
        const { searchParams } = new URL(request.url)
        const withDetails = searchParams.get('withDetails')
        
        const isMember = await isUserTripMember(auth, id)
        
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
    
})

/**
 * PUT /api/trips/[id]
 * Updates a trip by ID.
 */
export const PUT = withAuth<{ id: string }>(async (request, { params, auth }) => {
    
    const paramsObj = await params
    const id = parseInt(paramsObj.id, 10)
    
    try {
        
        const body = await request.json()
        
        const isMember = await isUserTripMember(auth, id)
        
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
    
})

/**
 * DELETE /api/trips/[id]
 * Deletes a trip by ID.
 */
export const DELETE = withAuth<{ id: string }>(async (_request, { params, auth }) => {
    
    const paramsObj = await params
    const id = parseInt(paramsObj.id, 10)
    
    try {
        
        const isMember = await isUserTripMember(auth, id)
        
        if (!isMember)
            return apiResponse.forbidden()
        
        await tripsRepo.deleteById(id)
        
        return apiResponse.okMessage('Trip deleted successfully')
        
    } catch (e) {
        
        console.error(`Error deleting trip ${id}:`, e)
        return apiResponse.internalServerError()
        
    }
    
})
