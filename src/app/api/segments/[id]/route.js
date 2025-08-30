import { NextResponse } from 'next/server'
import db from '@/db/index.js'
import * as schemas from '@/db/schema.js'
import { eq } from 'drizzle-orm'
import { getSegmentById } from '@/db/repos/segments.js'
import { convertStringDates, getUpdatePayload, keep, omit } from '@/lib/utils.js'

/**
 * PUT /api/segments/[id]
 * Updates a segment by ID.
 */
export async function PUT(request, opts) {
    
    const params = await opts.params
    
    try {
        const segmentData = await request.json()
        const id = parseInt(params.id, 10)
        
        
        //
        
        const segment = await getSegmentById(id)
        
        let payload = getUpdatePayload(segment, segmentData, ['tripId', 'planId'])
        console.log('//////// update1', payload)
        payload = convertStringDates(payload, ['startDate', 'endDate'])
        console.log('//////// update2', payload)
        
        /* console.log('wtfffffffffffff', id, segment.startDate, '-->', segmentData.startDate, payload)
        throw new Error('testing') */
        
        const [updatedSegment] = await db
            .update(schemas.segments)
            .set(payload)
            .where(eq(schemas.segments.id, id))
            .returning()
        console.log('//////// update', updatedSegment)
        if (!updatedSegment)
            return NextResponse.json(
                { success: false, error: 'Segment not found' },
                { status: 404 },
            )
        
        return NextResponse.json({
            success: true,
            data: updatedSegment,
            message: 'Segment updated successfully',
        })
        
    } catch (e) {
        
        console.error(`Error updating segment ${params.id}:`, e)
        
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 },
        )
        
    }
    
}
