import db from '@repo/shared/db';
import * as schemas from '@repo/shared/db/schema';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, isUserTripMember, withAuth } from '@repo/shared/utils/auth';
import { and, eq, inArray } from 'drizzle-orm';
export const deleteSegment = withAuth(async (req, res, context) => {
    try {
        const { tripId, planId, segmentIds } = req.body;
        if (!Array.isArray(segmentIds) || !segmentIds.length)
            return apiResponse.invalidParams(res, 'Param segmentIds is required and must be non-empty array');
        if (!tripId)
            return apiResponse.invalidParams(res, 'Param tripId is required');
        if (!planId)
            return apiResponse.invalidParams(res, 'Param planId is required');
        const isMember = await isUserTripMember(context, tripId);
        if (!isMember)
            return apiResponse.forbidden(res);
        await db.transaction(async (tx) => {
            await tx.delete(schemas.segments)
                .where(and(eq(schemas.segments.tripId, tripId), eq(schemas.segments.planId, planId), inArray(schemas.segments.id, segmentIds)));
        });
        return apiResponse.okMessage(res, 'Segments deleted successfully');
    }
    catch (e) {
        console.error('Error deleting segments:', e);
        return apiResponse.internalServerError(res);
    }
});
//# sourceMappingURL=deleteSegment.js.map