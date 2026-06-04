import plansRepo from '@repo/shared/db/repos/plans'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'

export const getPlans = async (
    _req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const plans = await plansRepo.findAll()
        
        return apiResponse.ok(res, plans)
        
    } catch (e) {
        
        console.error('Error getting plans:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
