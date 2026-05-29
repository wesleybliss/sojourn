import tripsRepo from '@repo/shared/db/repos/trips';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, withAuth } from '@repo/shared/utils/auth';
export const getTrips = withAuth(async (_req, res, context) => {
    const trips = await tripsRepo.findAllByUserId(context.userId);
    /*return res.json({
        data: trips,
    })*/
    return apiResponse.ok(res, trips);
});
//# sourceMappingURL=getTrips.js.map