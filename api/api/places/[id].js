import { apiResponse } from '@repo/shared/utils/api';
import { getPlace, updatePlace } from '@/handlers/places';
export const config = {
    runtime: 'nodejs',
};
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': return getPlace(req, res);
        case 'PUT': return updatePlace(req, res);
        default: return apiResponse.internalServerError(res);
    }
}
//# sourceMappingURL=%5Bid%5D.js.map