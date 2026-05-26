import db from '@repo/shared/db/index'
import usersRepo from '@repo/shared/db/repos/users'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'

/**
 * POST /api/debug/clear-all
 * Clears all data from the database (for debugging purposes)
 */
export const POST = withAuth(async (_request, { auth }) => {
    
    try {
        
        const { userId } = auth
        
        const user = await usersRepo.findOneById(userId)
        
        if (!user)
            return apiResponse.notFound('User not found')
        
        console.log('Clearing all database data...')
        
        // Delete all records from each table (in correct order due to foreign keys)
        await db.delete(schemas.segments)
        console.log('✅ Cleared segments table')
        
        await db.delete(schemas.plans)
        console.log('✅ Cleared plans table')
        
        await db.delete(schemas.trips)
        console.log('✅ Cleared trips table')
        
        return apiResponse.okMessage('Database cleared successfully')
        
    } catch (e) {
        
        console.error('❌ Error clearing database:', e)
        return apiResponse.internalServerError()
        
    }
    
})
