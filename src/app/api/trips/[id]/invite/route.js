import { NextResponse } from 'next/server'
import { withAuth, isUserTripMember } from '@/lib/auth'
import db from '@/db/index'
import * as schemas from '@/db/schema'
import usersRepo from '@/db/repos/users'
import tripsRepo from '@/db/repos/trips'

/**
 * POST /api/trips/invite
 * Adds another user to a trip.
 */
export const POST = withAuth(async (request, { params, auth }) => {
    
    try {
        
        const { id } = await params
        const { inviteeEmail } = await request.json()
        
        if (!inviteeEmail?.length)
            return NextResponse.json(
                { success: false, error: 'Param "inviteeEmail" is required' },
                { status: 422 })
        
        const isMember = await isUserTripMember(auth, id)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        const invitee = await usersRepo.findOneByEmail(inviteeEmail)
        
        if (!invitee)
            return NextResponse.json(
                { success: false, error: 'Invitee not found' },
                { status: 404 })
        
        const trip = await tripsRepo.findOneById(id)
        
        if (!trip)
            return NextResponse.json(
                { success: false, error: 'Trip not found' },
                { status: 404 })
        
        await db.insert(schemas.userTrips).values({
            userId: invitee.id,
            tripId: trip.id,
        })
        
        return NextResponse.json({
            success: true,
            data: { inviteeEmail, trip },
        })
        
    } catch (e) {
        
        console.error('Error inviting user to trip:', e)
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 },
        )
        
    }
    
})
