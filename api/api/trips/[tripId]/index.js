import { apiResponse } from '@repo/shared/utils/api';
import { getTrip } from '@/handlers/trips';
export const config = {
    runtime: 'nodejs',
};
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': return getTrip(req, res);
        default: return apiResponse.internalServerError(res);
    }
}
//# sourceMappingURL=index.js.map