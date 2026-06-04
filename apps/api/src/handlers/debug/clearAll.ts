import db from '@repo/shared/db/index'
import usersRepo from '@repo/shared/db/repos/users'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import type { Request, Response } from 'express'

export const clearAll = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const userId = req.auth?.user?.id
        
        const user = await usersRepo.findOneById(userId)
        
        if (!user)
            return apiResponse.notFound(res, 'User not found')
        
        // Delete all records from each table (in correct order due to foreign keys)
        await db.delete(schemas.segments)
        
        await db.delete(schemas.plans)
        
        await db.delete(schemas.trips)
        
        return apiResponse.okMessage(res, 'Database cleared successfully')
        
    } catch (e) {
        
        console.error('❌ Error clearing database:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
