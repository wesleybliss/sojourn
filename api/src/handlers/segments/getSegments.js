import segmentsRepo from '@repo/shared/db/repos/segments';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, withAuth } from '@repo/shared/utils/auth';
export const getSegments = withAuth(async (_req, res, _context) => {
    try {
        const segments = await segmentsRepo.findAll();
        return apiResponse.ok(res, segments);
    }
    catch (e) {
        console.error('Error getting segments:', e);
        return apiResponse.internalServerError(res);
    }
});
//# sourceMappingURL=getSegments.js.map