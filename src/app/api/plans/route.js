import { NextResponse } from 'next/server'
import db from '@/db/index.js'
import * as schemas from '@/db/schema.js'

/**
 * POST /api/plans
 * Creates a new plan.
 */
export async function POST(request) {
    try {
        const planData = await request.json()
        
        const [newPlan] = await db
            .insert(schemas.plans)
            .values({
                tripId: planData.tripId,
                name: planData.name || 'Untitled Plan',
                description: planData.description || '',
            })
            .returning()
        
        return NextResponse.json(
            {
                success: true,
                data: newPlan,
                message: 'Plan created successfully',
            },
            { status: 201 },
        )
    } catch (error) {
        console.error('Error creating plan:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        )
    }
}
