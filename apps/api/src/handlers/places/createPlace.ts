import placesRepo from '@repo/shared/db/repos/places'
import { getRandomUnsplashImageUrl } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'

export const createPlace = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const {
            name,
            focus,
            quickTip,
            personalNotes,
            region,
            travelWindow,
            isBookmarked = false,
        } = req.body
        
        if (!name?.length)
            return apiResponse.invalidParams(res, 'Param "name" required')
        
        const coverImageUrl = await getRandomUnsplashImageUrl(name)
        
        const newPlace = await placesRepo.create({
            name,
            coverImageUrl,
            focus,
            quickTip,
            personalNotes,
            region,
            travelWindow,
            isBookmarked,
        })
        
        return apiResponse.ok(res, newPlace)
        
    } catch (e) {
        
        console.error('Error getting place:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
