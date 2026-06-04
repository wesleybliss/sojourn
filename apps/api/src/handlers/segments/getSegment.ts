import segmentsRepo from '@repo/shared/db/repos/segments'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    segmentId: z.coerce.number(),
})

export const getSegments = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { segmentId } = paramsSchema.parse(req.params)
        
        const segment = await segmentsRepo.findOneById(segmentId)
        
        return apiResponse.ok(res, segment)
        
    } catch (e) {
        
        console.error('Error getting segment:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
