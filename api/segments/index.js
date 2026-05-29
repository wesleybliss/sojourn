import { apiResponse } from '@repo/shared/utils/api';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createSegment, deleteSegment, getSegments } from '@/handlers/segments';
export const config = {
    runtime: 'nodejs',
};
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': return getSegments(req, res);
        case 'POST': return createSegment(req, res);
        case 'DELETE': return deleteSegment(req, res);
        default: return apiResponse.internalServerError(res);
    }
}
//# sourceMappingURL=index.js.map