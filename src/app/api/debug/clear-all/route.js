import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import usersRepo from '@/db/repos/users'
import db from '@/db/index'
import * as schemas from '@/db/schema'

/**
 * POST /api/debug/clear-all
 * Clears all data from the database (for debugging purposes)
 */
export const POST = async request => {
    
    try {
        
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        })
        
        if (!token || !token.sub)
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        
        const userId = parseInt(String(token.sub), 10)
        
        if (Number.isNaN(userId))
            return NextResponse.json({ success: false, error: 'Invalid user ID' }, { status: 400 })
        
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
    
}
