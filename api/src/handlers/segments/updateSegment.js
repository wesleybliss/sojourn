import segmentsRepo from '@repo/shared/db/repos/segments';
import * as schemas from '@repo/shared/db/schema';
import { ID, SegmentInsert } from '@repo/shared/types';
import { convertStringDates, getUpdatePayload } from '@repo/shared/utils';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, withAuth } from '@repo/shared/utils/auth';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';
export const updateSegment = withAuth(async (req, res, _context) => {
    const segmentId = parseInt(req.query.id, 10);
    try {
        const segment = await segmentsRepo.findOneById(segmentId);
        if (!segment || segment.id !== segmentId)
            return apiResponse.notFound(res, 'Segment');
        const segmentData = req.body;
        const { cascadeEnabled } = segmentData;
        let payload = getUpdatePayload(segment, segmentData, ['tripId', 'planId', 'cascadeEnabled']);
        payload = convertStringDates(payload, ['startDate', 'endDate']);
        if (cascadeEnabled && (payload.startDate || payload.endDate)) {
            const segments = await segmentsRepo.findAllByPlanId(segment.planId);
            const targetIndex = segments.findIndex(s => s.id === segmentId);
            if (targetIndex === -1)
                return apiResponse.notFound(res, 'Segment not found in plan');
            const currentSegment = segments[targetIndex];
            const originalDuration = dayjs(currentSegment.endDate)
                .diff(dayjs(currentSegment.startDate), 'day');
            const updates = [];
            const newStartDate = payload.startDate ? dayjs(payload.startDate) : dayjs(currentSegment.startDate);
            const newEndDate = payload.endDate ? dayjs(payload.endDate) : newStartDate.add(originalDuration, 'day');
            updates.push({ id: currentSegment.id, startDate: newStartDate.toDate(), endDate: newEndDate.toDate() });
            let prevEnd = newEndDate;
            for (let i = targetIndex + 1; i < segments.length; i++) {
                const seg = segments[i];
                const dur = dayjs(seg.endDate).diff(dayjs(seg.startDate), 'day');
                const sStart = prevEnd;
                const sEnd = sStart.add(dur, 'day');
                updates.push({ id: seg.id, startDate: sStart.toDate(), endDate: sEnd.toDate() });
                prevEnd = sEnd;
            }
            // Use a transaction for the cascade updates
            const db = await import('@repo/shared/db');
            await db.default.transaction(async (tx) => {
                for (const u of updates) {
                    await tx.update(schemas.segments)
                        .set({
                        startDate: u.startDate,
                        endDate: u.endDate,
                    })
                        .where(eq(schemas.segments.id, u.id));
                }
            });
            const reloaded = await segmentsRepo.findOneById(segmentId);
            if (!reloaded)
                return apiResponse.notFound(res, 'Segment');
            return apiResponse.ok(res, {
                message: 'Segment dates updated successfully',
                data: reloaded,
            });
        }
        const updatedSegment = await segmentsRepo.updateById(segmentId, payload);
        if (!updatedSegment)
            return apiResponse.notFound(res, 'Updated segment not found');
        return apiResponse.ok(res, {
            message: 'Segment updated successfully',
            data: updatedSegment,
        });
    }
    catch (e) {
        console.error(`Error updating segment ${segmentId}:`, e);
        return apiResponse.internalServerError(res);
    }
});
//# sourceMappingURL=updateSegment.js.map