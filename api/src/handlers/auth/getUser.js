import HttpError from '@repo/shared/errors/HttpError';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, authorize, withAuth } from '@repo/shared/utils/auth';
export const getUser = withAuth(async (req, res, _context) => {
    try {
        const { user } = await authorize(req);
        return apiResponse.ok(res, {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                photoUrl: user.photoUrl,
                enabled: user.enabled,
            },
            needsInviteCode: !user.enabled,
        });
    }
    catch (e) {
        if (e instanceof HttpError)
            return apiResponse.fail(res, e.message, e.status);
        console.error('Error in GET /api/auth/user:', e);
        return apiResponse.internalServerError(res);
    }
});
//# sourceMappingURL=getUser.js.map