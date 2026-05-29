import { apiResponse } from '@repo/shared/utils/api';
import { createPlace, getPlaces } from '@/handlers/places';
export const config = {
    runtime: 'nodejs',
};
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': return getPlaces(req, res);
        case 'POST': return createPlace(req, res);
        default: return apiResponse.internalServerError(res);
    }
}
//# sourceMappingURL=index.js.map