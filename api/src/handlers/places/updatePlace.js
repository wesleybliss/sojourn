import db from '@repo/shared/db';
import * as schemas from '@repo/shared/db/schema';
import { apiResponse } from '@repo/shared/utils/api';
import { AuthContext, withAuth } from '@repo/shared/utils/auth';
import { eq } from 'drizzle-orm';
export const updatePlace = withAuth(async (req, res, _context) => {
    const placeId = parseInt(req.query.id, 10);
    try {
        const body = req.body;
        if (!placeId)
            return apiResponse.badRequest(res, `Invalid place ID: "${placeId}"`);
        const [place] = await db.select()
            .from(schemas.places)
            .where(eq(schemas.places.id, placeId));
        if (!place)
            return apiResponse.notFound(res, 'Place');
        const [updatedPlace] = await db
            .update(schemas.places)
            .set({
            name: body.name,
            coverImageUrl: body.coverImageUrl,
            focus: body.focus,
            quickTip: body.quickTip,
            personalNotes: body.personalNotes,
            region: body.region,
            travelWindow: body.travelWindow,
            isBookmarked: body.isBookmarked,
        })
            .where(eq(schemas.places.id, placeId))
            .returning();
        if (!updatedPlace)
            return apiResponse.notFound(res, 'Place');
        return apiResponse.ok(res, {
            message: 'Place updated successfully',
            data: updatedPlace,
        });
    }
    catch (e) {
        console.error('Error updating place:', e);
        return apiResponse.internalServerError(res);
    }
});
//# sourceMappingURL=updatePlace.js.map