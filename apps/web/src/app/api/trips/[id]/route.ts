import plansRepo from '@repo/shared/db/repos/plans'
import tripsRepo from '@repo/shared/db/repos/trips'
import { isUserTripMember, withAuth } from '@repo/shared/utils/auth'
import { NextResponse } from 'next/server'

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
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        const trip = withDetails
            ? await tripsRepo.findOneWithDetails(id, plansRepo)
            : await tripsRepo.findOneById(id)
        
        if (!trip)
            return NextResponse.json(
                { success: false, error: 'Trip not found' },
                { status: 404 })
        
        return NextResponse.json({
            success: true,
            data: trip,
        })
        
    } catch (e) {
        
        console.error(`Error getting trip ${id}:`, e)
        return NextResponse.json(
            { success: false, error: (e as Error).message },
            { status: 500 })
        
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
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        const updatedTrip = await tripsRepo.updateById(id, body)
        
        if (!updatedTrip)
            return NextResponse.json(
                { success: false, error: 'Trip not found' },
                { status: 404 })
        
        return NextResponse.json({
            success: true,
            data: updatedTrip,
            message: 'Trip updated successfully',
        })
        
    } catch (e) {
        
        console.error(`Error updating trip ${id}:`, e)
        return NextResponse.json(
            { success: false, error: (e as Error).message },
            { status: 500 })
        
    }
    
})

/**
 * DELETE /api/trips/[id]
 * Deletes a trip by ID.
 */
export const DELETE = withAuth<{ id: string }>(async (request, { params, auth }) => {
    
    const paramsObj = await params
    const id = parseInt(paramsObj.id, 10)
    
    try {
        
        const isMember = await isUserTripMember(auth, id)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        await tripsRepo.deleteById(id)
        
        return NextResponse.json({
            success: true,
            message: 'Trip deleted successfully',
        })
        
    } catch (e) {
        
        console.error(`Error deleting trip ${id}:`, e)
        return NextResponse.json(
            { success: false, error: (e as Error).message },
            { status: 500 })
        
    }
    
})
