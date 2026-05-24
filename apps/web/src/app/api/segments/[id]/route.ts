import { NextResponse } from 'next/server'
import db from '@repo/shared/db/index'
import * as schemas from '@repo/shared/db/schema'
import { eq } from 'drizzle-orm'
import segmentsRepo from '@repo/shared/db/repos/segments'
import { convertStringDates, getUpdatePayload } from '@repo/shared/utils'
import dayjs from 'dayjs'
import { withAuth } from '@repo/shared/utils/auth'
import { ID, SegmentInsert } from '@repo/shared/types'

export const PUT = withAuth<{ id: string }>(async (request, { params }) => {
    
    const paramsObj = await params
    const id = parseInt(paramsObj.id, 10)
    
    try {
        
        const segment = await segmentsRepo.findOneById(id)
        
        if (segment?.id !== id)
            return NextResponse.json({ success: false, error: 'Segment not found' }, { status: 404 })
        
        const segmentData = await request.json()
        const { cascadeEnabled } = segmentData
        
        let payload = getUpdatePayload(segment, segmentData, ['tripId', 'planId', 'cascadeEnabled'])
        
        payload = convertStringDates(payload, ['startDate', 'endDate'])
        
        if (cascadeEnabled && (payload.startDate || payload.endDate)) {
            
            const segments = await segmentsRepo.findAllByPlanId(segment.planId)
            
            const targetIndex = segments.findIndex(s => s.id === id)
            
            if (targetIndex === -1)
                return NextResponse.json({ success: false, error: 'Segment not found' }, { status: 404 })
            
            const currentSegment = segments[targetIndex]
            const originalDuration = dayjs(currentSegment.endDate as Date)
                .diff(dayjs(currentSegment.startDate as Date), 'day')
            
            const updates: Array<Partial<SegmentInsert> & { id: ID }> = []
            
            let newStartDate = payload.startDate ? dayjs(payload.startDate) : dayjs(currentSegment.startDate as Date)
            let newEndDate = payload.endDate ? dayjs(payload.endDate) : newStartDate.add(originalDuration, 'day')
            
            updates.push({ id: currentSegment.id, startDate: newStartDate.toDate(), endDate: newEndDate.toDate() })
            
            let prevEnd = newEndDate
            
            for (let i = targetIndex + 1; i < segments.length; i++) {
                const seg = segments[i]
                const dur = dayjs(seg.endDate as Date).diff(dayjs(seg.startDate as Date), 'day')
                const sStart = prevEnd
                const sEnd = sStart.add(dur, 'day')
                
                updates.push({ id: seg.id, startDate: sStart.toDate(), endDate: sEnd.toDate() })
                prevEnd = sEnd
            }
            
            await db.transaction(async tx => {
                for (const u of updates) {
                    await tx.update(schemas.segments)
                        .set({ startDate: u.startDate, endDate: u.endDate })
                        .where(eq(schemas.segments.id, u.id))
                }
            })
            
            const [reloaded] = await db.select().from(schemas.segments).where(eq(schemas.segments.id, id))
            
            return NextResponse.json({
                success: true,
                data: reloaded, message: 'Segment dates updated successfully',
            })
            
        }
        
        const [updatedSegment] = await db
            .update(schemas.segments)
            .set(payload)
            .where(eq(schemas.segments.id, id))
            .returning()
        
        if (!updatedSegment)
            return NextResponse.json({ success: false, error: 'Segment not found' }, { status: 404 })
        
        return NextResponse.json({ success: true, data: updatedSegment, message: 'Segment updated successfully' })
        
    } catch (e) {
        
        console.error(`Error updating segment ${id}:`, e)
        
        return NextResponse.json({ success: false, error: (e as Error).message }, { status: 500 })
        
    }
    
})
