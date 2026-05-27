import placesRepo from '@repo/shared/db/repos/places'
import { getRandomUnsplashImageUrl } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'

/**
 * POST /api/places
 * Gets a list of places.
 */
export const GET = withAuth(async () => {
    
    try {
        
        const places = await placesRepo.findAll()
        
        return apiResponse.ok({ data: places })
        
    } catch (e) {
        
        console.error('Error getting places:', e)
        return apiResponse.internalServerError()
        
    }
    
})

export const POST = withAuth(async request => {
    
    try {
        
        const body = await request.json()
        const {
            name,
            focus,
            quickTip,
            personalNotes,
            region,
            travelWindow,
            isBookmarked = false,
        } = body
        
        if (!name?.length)
            return apiResponse.invalidParams('Param "name" required')
        
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
        
        return apiResponse.ok({ data: newPlace })
        
    } catch (e) {
        
        console.error('Error creating new place:', e)
        return apiResponse.internalServerError()
        
    }
    
})
