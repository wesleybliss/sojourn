import { apiResponse } from '@repo/shared/utils/api';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { getRandomPhoto } from '@/handlers/utils';
export const config = {
    runtime: 'nodejs',
};
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': return getRandomPhoto(req, res);
        default: return apiResponse.internalServerError(res);
    }
}
//# sourceMappingURL=index.js.map