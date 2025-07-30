import { NextResponse } from 'next/server'
import db from '@/db/index.js'
import * as schemas from '@/db/schema.js'
import { eq } from 'drizzle-orm'

/**
 * PUT /api/segments/[id]
 * Updates a segment by ID.
 */
export async function PUT(request, opts) {
    
    const params = await opts.params
    
    try {
        const segmentData = await request.json()
        const id = parseInt(params.id, 10)
        
        const [updatedSegment] = await db
            .update(schemas.segments)
            .set({
                name: segmentData.name,
                description: segmentData.description,
                startDate: segmentData.startDate,
                endDate: segmentData.endDate,
                coordsLat: segmentData.coordsLat,
                coordsLng: segmentData.coordsLng,
                color: segmentData.color,
                flightBooked: segmentData.flightBooked,
                stayBooked: segmentData.stayBooked,
                isShengenRegion: segmentData.isShengenRegion,
                planId: segmentData.planId,
            })
            .where(eq(schemas.segments.id, id))
            .returning()
        
        if (!updatedSegment) {
            return NextResponse.json(
                { success: false, error: 'Segment not found' },
                { status: 404 },
            )
        }
        
        return NextResponse.json({
            success: true,
            data: updatedSegment,
            message: 'Segment updated successfully',
        })
    } catch (error) {
        console.error(`Error updating segment ${params.id}:`, error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        )
    }
}
