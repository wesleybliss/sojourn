import db from '@repo/shared/db/index';
import usersRepo from '@repo/shared/db/repos/users';
import * as schemas from '@repo/shared/db/schema';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, withAuth } from '@repo/shared/utils/auth';
export const clearAll = withAuth(async (_req, res, context) => {
    try {
        const { userId } = context;
        const user = await usersRepo.findOneById(userId);
        if (!user)
            return apiResponse.notFound(res, 'User not found');
        // Delete all records from each table (in correct order due to foreign keys)
        await db.delete(schemas.segments);
        await db.delete(schemas.plans);
        await db.delete(schemas.trips);
        return apiResponse.okMessage(res, 'Database cleared successfully');
    }
    catch (e) {
        console.error('❌ Error clearing database:', e);
        return apiResponse.internalServerError(res);
    }
});
//# sourceMappingURL=clearAll.js.map