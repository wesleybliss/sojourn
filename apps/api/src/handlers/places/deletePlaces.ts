import placesRepo from '@repo/shared/db/repos/places'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
    placeIds: z.array(z.coerce.number()),
})

export const deletePlaces = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { placeIds } = bodySchema.parse(req.body)
        
        await placesRepo.deleteByIds(placeIds)
        
        return apiResponse.okMessage(res, 'Places deleted successfully')
        
    } catch (e) {
        
        console.error('Error deleting places:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
