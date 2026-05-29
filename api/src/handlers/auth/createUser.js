import db from '@repo/shared/db';
import * as schemas from '@repo/shared/db/schema';
import HttpError from '@repo/shared/errors/HttpError';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, authorize, withAuth } from '@repo/shared/utils/auth';
import { eq } from 'drizzle-orm';
export const createUser = withAuth(async (req, res, _context) => {
    try {
        const { user } = await authorize(req);
        const { inviteCode } = req.body;
        if (!inviteCode)
            throw new HttpError(400, 'Invite code is required');
        const correctCode = process.env.INVITE_CODE;
        if (!correctCode)
            throw new HttpError(500, 'Invite code system not configured');
        if (inviteCode !== correctCode)
            throw new HttpError(400, 'Invalid invite code');
        if (user.enabled)
            return apiResponse.ok(res, {
                message: 'User already enabled',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        photoUrl: user.photoUrl,
                        enabled: user.enabled,
                    },
                    needsInviteCode: false,
                },
            });
        // Enable the user
        const [updatedUser] = await db
            .update(schemas.users)
            .set({ enabled: true })
            .where(eq(schemas.users.id, user.id))
            .returning();
        return apiResponse.ok(res, {
            message: 'Account enabled successfully',
            data: {
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    name: updatedUser.name,
                    photoUrl: updatedUser.photoUrl,
                    enabled: updatedUser.enabled,
                },
                needsInviteCode: false,
            },
        });
    }
    catch (e) {
        if (e instanceof HttpError)
            return apiResponse.fail(res, e.message, e.status);
        console.error('Error in POST /api/auth/user:', e);
        return apiResponse.internalServerError(res);
    }
});
//# sourceMappingURL=createUser.js.map