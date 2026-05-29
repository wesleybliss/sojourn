import { apiResponse } from '@repo/shared/utils/api';
import { inviteTripMember } from '@/handlers/trips';
export const config = {
    runtime: 'nodejs',
};
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': return inviteTripMember(req, res);
        default: return apiResponse.internalServerError(res);
    }
}
//# sourceMappingURL=invite.js.map