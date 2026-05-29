import placesRepo from '@repo/shared/db/repos/places';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, withAuth } from '@repo/shared/utils/auth';
export const getPlace = withAuth(async (req, res, _context) => {
    try {
        const placeId = parseInt(req.query.placeId, 10);
        const place = await placesRepo.findOneById(placeId);
        return apiResponse.ok(res, place);
    }
    catch (e) {
        console.error('Error getting place:', e);
        return apiResponse.internalServerError(res);
    }
});
//# sourceMappingURL=getPlace.js.map