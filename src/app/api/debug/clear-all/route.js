import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth'
import usersRepo from '@/db/repos/users'
import db from '@/db/index'
import * as schemas from '@/db/schema'

/**
 * POST /api/debug/clear-all
 * Clears all data from the database (for debugging purposes)
 */
export const POST = withAuth(async (request, { auth }) => {
    
    try {
        
        const { userId } = auth
        
        const user = await usersRepo.findOneById(userId)
        
        if (!user)
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
        
        console.log('Clearing all database data...')
        
        // Delete all records from each table (in correct order due to foreign keys)
        await db.delete(schemas.segments)
        console.log('✅ Cleared segments table')
        
        await db.delete(schemas.plans)
        console.log('✅ Cleared plans table')
        
        await db.delete(schemas.trips)
        console.log('✅ Cleared trips table')
        
        return NextResponse.json({
            success: true,
            message: 'Database cleared successfully',
        })
        
    } catch (e) {
        
        console.error('❌ Error clearing database:', e)
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 },
        )
        
    }
    
})
