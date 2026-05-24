import { NextResponse } from 'next/server'
import db from '@repo/shared/db/index'
import * as schemas from '@repo/shared/db/schema'
import { withAuth, isUserTripMember } from '@repo/shared/utils/auth'
import { eq, and, inArray } from 'drizzle-orm'

/**
 * POST /api/segments
 * Creates a new segment.
 */
export const POST = withAuth(async (request, { auth }) => {
    
    try {
        
        const body = await request.json()
        
        const {
            tripId,
            planId,
            startDate,
            endDate,
            name,
            color,
        } = body
        
        if (!tripId)
            return NextResponse.json(
                { success: false, error: 'Param tripId is required' },
                { status: 422 })
        
        if (!planId)
            return NextResponse.json(
                { success: false, error: 'Param planId is required' },
                { status: 422 })
        
        if (!name?.length)
            return NextResponse.json(
                { success: false, error: 'Param name is required' },
                { status: 422 })
        
        if (!startDate?.length)
            return NextResponse.json(
                { success: false, error: 'Param startDate is required' },
                { status: 422 })
        
        if (!endDate?.length)
            return NextResponse.json(
                { success: false, error: 'Param endDate is required' },
                { status: 422 })
        
        const isMember = await isUserTripMember(auth, tripId)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        const [createdSegment] = await db
            .insert(schemas.segments)
            .values({
                tripId,
                planId,
                startDate,
                endDate,
                name,
                color,
            })
            .returning()
        
        return NextResponse.json(
            { success: true, data: createdSegment, message: 'Segment created successfully' },
            { status: 201 })
        
    } catch (e) {
        
        console.error('Error creating segment:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})

export const DELETE = withAuth(async (request, { auth }) => {
    
    try {
        
        const body = await request.json()
        const { tripId, planId, segmentIds } = body
        
        if (!Array.isArray(segmentIds) || !segmentIds.length)
            return NextResponse.json(
                { success: false, error: 'Param segmentIds is required and must be non-empty array' },
                { status: 422 })
        
        if (!tripId)
            return NextResponse.json(
                { success: false, error: 'Param tripId is required' },
                { status: 422 })
        
        if (!planId)
            return NextResponse.json(
                { success: false, error: 'Param planId is required' },
                { status: 422 })
        
        const isMember = await isUserTripMember(auth, tripId)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        await db.transaction(async tx => {
            await tx.delete(schemas.segments)
                .where(and(
                    eq(schemas.segments.tripId, tripId),
                    eq(schemas.segments.planId, planId),
                    inArray(schemas.segments.id, segmentIds),
                ))
        })
        
        return NextResponse.json(
            { success: true, message: 'Segments deleted successfully' },
            { status: 200 })
        
    } catch (e) {
        
        console.error('Error deleting segments:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})
