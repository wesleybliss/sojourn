import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { and, eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    teamId: z.coerce.number(),
    tripId: z.coerce.number(),
})

export const deleteTrip = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { teamId, tripId } = paramsSchema.parse(req.params)
        
        if (!tripId)
            return apiResponse.badRequest(res, 'Invalid trip ID')
        
        const [trip] = await db.select()
            .from(schemas.trips)
            .where(and(
                eq(schemas.teams.id, teamId),
                eq(schemas.trips.id, tripId),
            ))
        
        if (!trip)
            return apiResponse.notFound(res, 'Trip')
        
        const [deletedTrip] = await db
            .delete(schemas.trips)
            .where(eq(schemas.trips.id, tripId))
            .returning()
        
        if (!deletedTrip)
            return apiResponse.notFound(res, 'Trip')
        
        return apiResponse.okMessage(res, 'Trip deleted successfully')
        
    } catch (e) {
        
        console.error('Error deleting trip:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
