import { apiResponse } from '@repo/shared/utils/api';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { updateSegment } from '@/handlers/segments';
export const config = {
    runtime: 'nodejs',
};
export default async function handler(req, res) {
    switch (req.method) {
        case 'PUT': return updateSegment(req, res);
        default: return apiResponse.internalServerError(res);
    }
}
//# sourceMappingURL=%5Bid%5D.js.map