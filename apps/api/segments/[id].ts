import db from '@repo/shared/db/index'
import segmentsRepo from '@repo/shared/db/repos/segments'
import * as schemas from '@repo/shared/db/schema'
import { ID, SegmentInsert } from '@repo/shared/types'
import { convertStringDates, getUpdatePayload } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'

const handler = async (request: Request, context: { auth: any, params: Promise<{ id: string }> }) => {
  if (request.method === 'PUT') {
    const paramsObj = await context.params
    const id = parseInt(paramsObj.id, 10)
    
    try {
      const segment = await segmentsRepo.findOneById(id)
      
      if (segment?.id !== id)
        return apiResponse.notFound('Segment')
      
      const segmentData = await request.json()
      const { cascadeEnabled } = segmentData
      
      let payload = getUpdatePayload(segment, segmentData, ['tripId', 'planId', 'cascadeEnabled'])
      
      payload = convertStringDates(payload, ['startDate', 'endDate'])
      
      if (cascadeEnabled && (payload.startDate || payload.endDate)) {
        const segments = await segmentsRepo.findAllByPlanId(segment.planId)
        
        const targetIndex = segments.findIndex(s => s.id === id)
        
        if (targetIndex === -1)
          return apiResponse.notFound('Segment not found in plan')
        
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
        
        await db.transaction(async tx => {
          for (const u of updates) {
            await tx.update(schemas.segments)
                .set({
                  startDate: u.startDate as Date,
                  endDate: u.endDate as Date,
                })
                .where(eq(schemas.segments.id, u.id))
          }
        })
        
        const [reloaded] = await db.select().from(schemas.segments).where(eq(schemas.segments.id, id))
        
        return apiResponse.ok({
          message: 'Segment dates updated successfully',
          data: reloaded,
        })
      }
      
      const [updatedSegment] = await db
          .update(schemas.segments)
          .set(payload)
          .where(eq(schemas.segments.id, id))
          .returning()
      
      if (!updatedSegment)
        return apiResponse.notFound('Updated segment not found')
      
      return apiResponse.ok({
        message: 'Segment updated successfully',
        data: updatedSegment,
      })
    } catch (e) {
      console.error(`Error updating segment ${id}:`, e)
      return apiResponse.internalServerError()
    }
  } else {
    return new Response(
      JSON.stringify({ success: false, error: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export default withAuth(handler)