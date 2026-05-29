import { getRandomUnsplashImageUrl } from '@repo/shared/utils';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, withAuth } from '@repo/shared/utils/auth';
export const getRandomPhoto = withAuth(async (req, res, _context) => {
    const { topic } = req.body;
    try {
        const url = await getRandomUnsplashImageUrl(topic);
        return apiResponse.ok(res, { data: url });
    }
    catch (e) {
        console.error(`Error getting random photo with topic ${topic}:`, e);
        return apiResponse.internalServerError(res);
    }
});
//# sourceMappingURL=getRandomPhoto.js.map