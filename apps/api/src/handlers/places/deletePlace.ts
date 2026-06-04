import placesRepo from '@repo/shared/db/repos/places'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    placeId: z.coerce.number(),
})

export const deletePlace = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { placeId } = paramsSchema.parse(req.params)
        
        await placesRepo.deleteByIds([placeId])
        
        return apiResponse.okMessage(res, 'Place deleted successfully')
        
    } catch (e) {
        
        console.error('Error deleting place:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
