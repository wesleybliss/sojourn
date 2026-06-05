import segmentsRepo from '@repo/shared/db/repos/segments'
import * as schemas from '@repo/shared/db/schema'
import type { ID, SegmentInsert } from '@repo/shared/types'
import { convertStringDates, getUpdatePayload } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    segmentId: z.coerce.number(),
})

export const updateSegment = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    const { segmentId } = paramsSchema.parse(req.params)
    
    try {
        
        const segment = await segmentsRepo.findOneById(segmentId)
        
        if (!segment || segment.id !== segmentId)
            return apiResponse.notFound(res, 'Segment')
        
        const segmentData = req.body
        const { cascadeEnabled } = segmentData
        
        let payload = getUpdatePayload(segment, segmentData, ['tripId', 'planId', 'cascadeEnabled'])
        
        payload = convertStringDates(payload, ['startDate', 'endDate'])
        
        if (cascadeEnabled && (payload.startDate || payload.endDate)) {
            
            const segments = await segmentsRepo.findAllByPlanId(segment.planId)
            
            const targetIndex = segments.findIndex(s => s.id === segmentId)
            
            if (targetIndex === -1)
                return apiResponse.notFound(res, 'Segment not found in plan')
            
            const currentSegment = segments[targetIndex]
            const originalDuration = dayjs(currentSegment.endDate as Date)
                .diff(dayjs(currentSegment.startDate as Date), 'day')
            
            const updates: Array<Partial<SegmentInsert> & { id: ID }> = []
            
            const newStartDate = payload.startDate ? dayjs(payload.startDate) : dayjs(currentSegment.startDate as Date)
            const newEndDate = payload.endDate ? dayjs(payload.endDate) : newStartDate.add(originalDuration, 'day')
            
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
            
            // Use a transaction for the cascade updates
            const db = await import('@repo/shared/db')
            await db.default.transaction(async tx => {
                for (const u of updates) {
                    await tx.update(schemas.segments)
                        .set({
                            startDate: u.startDate as Date,
                            endDate: u.endDate as Date,
                        })
                        .where(eq(schemas.segments.id, u.id))
                }
            })
            
            const reloaded = await segmentsRepo.findOneById(segmentId)
            
            if (!reloaded)
                return apiResponse.notFound(res, 'Segment')
            
            return apiResponse.ok(res, reloaded)
            
        }
        
        const updatedSegment = await segmentsRepo.updateById(segmentId, payload)
        
        if (!updatedSegment)
            return apiResponse.notFound(res, 'Updated segment not found')
        
        return apiResponse.ok(res, updatedSegment)
        
    } catch (e) {
        
        console.error(`Error updating segment ${segmentId}:`, e)
        return apiResponse.internalServerError(res)
        
    }
    
}
