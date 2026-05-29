import { apiResponse } from '@repo/shared/utils/api';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { uploadBlob } from '@/handlers/debug/storage';
export const config = {
    runtime: 'nodejs',
};
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': return uploadBlob(req, res);
        default: return apiResponse.internalServerError(res);
    }
}
//# sourceMappingURL=blob.js.map