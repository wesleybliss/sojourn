import placesRepo from '@repo/shared/db/repos/places'
import { getRandomUnsplashImageUrl } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
    geonamesCityId: z.coerce.number(),
    name: z.coerce.string(),
    focus: z.coerce.string(),
    isBookmarked: z.coerce.boolean(),
})

export const createPlace = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        if (!req.auth.teamId)
            throw new Error('No current team selected')
        
        const {
            geonamesCityId,
            name,
            focus,
            isBookmarked = false,
        } = bodySchema.parse(req.body)
        
        if (!name?.length)
            return apiResponse.invalidParams(res, 'Param "name" required')
        
        const coverImageUrl = await getRandomUnsplashImageUrl(name)
        
        const newPlace = await placesRepo.create({
            teamId: req.auth.teamId,
            geonamesCityId,
            name,
            coverImageUrl,
            focus,
            isBookmarked,
        })
        
        return apiResponse.ok(res, newPlace)
        
    } catch (e) {
        
        console.error('Error getting place:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
