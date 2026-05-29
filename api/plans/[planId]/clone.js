import { apiResponse } from '@repo/shared/utils/api';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { clonePlan } from '@/handlers/plans';
export const config = {
    runtime: 'nodejs',
};
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': return clonePlan(req, res);
        default: return apiResponse.internalServerError(res);
    }
}
//# sourceMappingURL=clone.js.map