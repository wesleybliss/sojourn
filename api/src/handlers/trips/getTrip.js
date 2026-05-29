import tripsRepo from '@repo/shared/db/repos/trips';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, withAuth } from '@repo/shared/utils/auth';
export const getTrip = withAuth(async (req, res, _context) => {
    const tripId = parseInt(req.query.tripId, 10);
    // @todo auth via context.userId
    const trip = await tripsRepo.findOneById(tripId);
    return apiResponse.ok(res, trip);
});
//# sourceMappingURL=getTrip.js.map