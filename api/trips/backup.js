import { apiResponse } from '@repo/shared/utils/api';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { backupTrips } from '@/handlers/trips';
export const config = {
    runtime: 'nodejs',
};
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': return backupTrips(req, res);
        default: return apiResponse.internalServerError(res);
    }
}
//# sourceMappingURL=backup.js.map