import { NextResponse } from 'next/server'
import db from '@/db2/index.js'
import * as schemas from '@/db2/schema.js'

/**
 * POST /api/debug/clear-all
 * Clears all data from the database (for debugging purposes)
 */
export async function POST() {
    try {
        console.log('🗑️ Clearing all database data...')
        
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
    } catch (error) {
        console.error('❌ Error clearing database:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}