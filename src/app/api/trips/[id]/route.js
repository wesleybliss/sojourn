import { NextResponse } from 'next/server'
import {
    getTripById,
    getTripWithDetails,
    updateTrip as updateTripQuery,
    deleteTrip as deleteTripQuery,
} from '@/db/repos/trips'
import { withAuth, isUserTripMember } from '@/lib/auth'

/**
 * GET /api/trips/[id]
 * Returns a single trip by ID.
 */
export const GET = withAuth(async (request, { params, auth }) => {
    
    try {
        
        // const { id, withDetails } = await params
        const { id } = await params
        const { searchParams } = new URL(request.url)
        const withDetails = searchParams.get('withDetails')
        
        const isMember = await isUserTripMember(auth, id)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        const trip = withDetails
            ? await getTripWithDetails(id)
            : await getTripById(id)
        
        if (!trip)
            return NextResponse.json(
                { success: false, error: 'Trip not found' },
                { status: 404 })
        
        return NextResponse.json({
            success: true,
            data: trip,
        })
        
    } catch (e) {
        
        console.error(`Error getting trip ${params.id}:`, e)
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 })
        
    }
    
})

/**
 * PUT /api/trips/[id]
 * Updates a trip by ID.
 */
export const PUT = withAuth(async (request, { params, auth }) => {
    
    try {
        
        const { id } = await params
        const body = await request.json()
        
        const isMember = await isUserTripMember(auth, id)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        const updatedTrip = await updateTripQuery(id, body)
        
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
        
        console.error(`Error updating trip ${params.id}:`, e)
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 })
        
    }
    
})

/**
 * DELETE /api/trips/[id]
 * Deletes a trip by ID.
 */
export const DELETE = withAuth(async (request, { params, auth }) => {
    
    try {
        
        const { id } = await params
        
        const isMember = await isUserTripMember(auth, id)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        await deleteTripQuery(id)
        
        return NextResponse.json({
            success: true,
            message: 'Trip deleted successfully',
        })
        
    } catch (e) {
        
        console.error(`Error deleting trip ${params.id}:`, e)
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 })
        
    }
    
})
