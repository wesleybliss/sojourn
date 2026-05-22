import { NextResponse } from 'next/server'
import db from '@/db/index'
import * as schemas from '@/db/schema'
import { eq } from 'drizzle-orm'
import segmentsRepo from '@/db/repos/segments'
import { convertStringDates, getUpdatePayload } from '@/utils'
import dayjs from 'dayjs'

export async function PUT(request, opts) {
    
    const params = await opts.params
    
    try {
        
        const id = parseInt(params.id, 10)
        const segment = await segmentsRepo.findOneById(id)
        
        if (segment?.id !== id)
            return NextResponseon({ success: false, error: 'Segment not found' }, { status: 404 })
        
        const segmentData = await requeston()
        const { cascadeEnabled } = segmentData
        
        let payload = getUpdatePayload(segment, segmentData, ['tripId', 'planId', 'cascadeEnabled'])
        
        payload = convertStringDates(payload, ['startDate', 'endDate'])
        
        if (cascadeEnabled && (payload.startDate || payload.endDate)) {
            
            const segments = await segmentsRepo.findAllByPlanId(segment.planId)
            
            const targetIndex = segments.findIndex(s => s.id === id)
            
            if (targetIndex === -1)
                return NextResponseon({ success: false, error: 'Segment not found' }, { status: 404 })
            
            const currentSegment = segments[targetIndex]
            const originalDuration = dayjs(currentSegment.endDate).diff(dayjs(currentSegment.startDate), 'day')
            
            const updates = []
            
            let newStartDate = payload.startDate ? dayjs(payload.startDate) : dayjs(currentSegment.startDate)
            let newEndDate = payload.endDate ? dayjs(payload.endDate) : newStartDate.add(originalDuration, 'day')
            
            updates.push({ id: currentSegment.id, startDate: newStartDate.toDate(), endDate: newEndDate.toDate() })
            
            let prevEnd = newEndDate
            
            for (let i = targetIndex + 1; i < segments.length; i++) {
                const seg = segments[i]
                const dur = dayjs(seg.endDate).diff(dayjs(seg.startDate), 'day')
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
            
            return NextResponseon({
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
            return NextResponseon({ success: false, error: 'Segment not found' }, { status: 404 })
        
        return NextResponseon({ success: true, data: updatedSegment, message: 'Segment updated successfully' })
        
    } catch (e) {
        
        console.error(`Error updating segment ${params.id}:`, e)
        
        return NextResponseon({ success: false, error: e.message }, { status: 500 })
        
    }
    
}
