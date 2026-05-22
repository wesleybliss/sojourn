import { NextResponse } from 'next/server'
import { withAuth, isUserTripMember } from '@/lib/auth'
import tripsRepo from '@/db/repos/trips'
import plansRepo from '@/db/repos/plans'

/**
 * GET /api/trips/[id]
 * Returns a single trip by ID.
 */
export const GET = withAuth(async (request, { params, auth }) => {
    
    const { id } = await params
    
    try {
        
        const { searchParams } = new URL(request.url)
        const withDetails = searchParams.get('withDetails')
        
        const isMember = await isUserTripMember(auth, id)
        
        if (!isMember)
            return NextResponseon({ success: false, error: 'Forbidden' }, { status: 403 })
        
        const trip = withDetails
            ? await tripsRepo.findOneWithDetails(id, plansRepo)
            : await tripsRepo.findOneById(id)
        
        if (!trip)
            return NextResponseon(
                { success: false, error: 'Trip not found' },
                { status: 404 })
        
        return NextResponseon({
            success: true,
            data: trip,
        })
        
    } catch (e) {
        
        console.error(`Error getting trip ${id}:`, e)
        return NextResponseon(
            { success: false, error: e.message },
            { status: 500 })
        
    }
    
})

/**
 * PUT /api/trips/[id]
 * Updates a trip by ID.
 */
export const PUT = withAuth(async (request, { params, auth }) => {
    
    const { id } = await params
    
    try {
        
        const body = await requeston()
        
        const isMember = await isUserTripMember(auth, id)
        
        if (!isMember)
            return NextResponseon({ success: false, error: 'Forbidden' }, { status: 403 })
        
        const updatedTrip = await tripsRepo.updateById(id, body)
        
        if (!updatedTrip)
            return NextResponseon(
                { success: false, error: 'Trip not found' },
                { status: 404 })
        
        return NextResponseon({
            success: true,
            data: updatedTrip,
            message: 'Trip updated successfully',
        })
        
    } catch (e) {
        
        console.error(`Error updating trip ${id}:`, e)
        return NextResponseon(
            { success: false, error: e.message },
            { status: 500 })
        
    }
    
})

/**
 * DELETE /api/trips/[id]
 * Deletes a trip by ID.
 */
export const DELETE = withAuth(async (request, { params, auth }) => {
    
    const { id } = await params
    
    try {
        
        const isMember = await isUserTripMember(auth, id)
        
        if (!isMember)
            return NextResponseon({ success: false, error: 'Forbidden' }, { status: 403 })
        
        await tripsRepo.deleteById(id)
        
        return NextResponseon({
            success: true,
            message: 'Trip deleted successfully',
        })
        
    } catch (e) {
        
        console.error(`Error deleting trip ${id}:`, e)
        return NextResponseon(
            { success: false, error: e.message },
            { status: 500 })
        
    }
    
})
