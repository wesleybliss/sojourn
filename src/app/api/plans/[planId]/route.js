import { NextResponse } from 'next/server'
import db from '@/db/index.js'
import { plans } from '@/db/schema.js'
import { eq } from 'drizzle-orm'

/**
 * GET /api/plans/[planId]
 * Fetches a single plan.
 */
export async function GET(request, { params }) {
    try {
        const { planId } = params
        
        if (isNaN(parseInt(planId, 10))) {
            return NextResponse.json({ success: false, error: 'Invalid plan ID' }, { status: 400 })
        }
        
        const [plan] = await db.select().from(plans).where(eq(plans.id, parseInt(planId, 10)))
        
        if (!plan)
            return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 })
        
        return NextResponse.json({ success: true, data: plan })
    } catch (error) {
        console.error('Error fetching plan:', error)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}

/**
 * PUT /api/plans/[planId]
 * Updates a plan.
 */
export async function PUT(request, { params }) {
    try {
        const { planId } = params
        
        if (isNaN(parseInt(planId, 10))) {
            return NextResponse.json({ success: false, error: 'Invalid plan ID' }, { status: 400 })
        }
        
        const planData = await request.json()
        const { id, tripId, ...updatableData } = planData
        
        const [updatedPlan] = await db
            .update(plans)
            .set(updatableData)
            .where(eq(plans.id, parseInt(planId, 10)))
            .returning()
        
        if (!updatedPlan) {
            return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 })
        }
        
        return NextResponse.json({ success: true, data: updatedPlan, message: 'Plan updated successfully' })
    } catch (error) {
        console.error('Error updating plan:', error)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}

/**
 * DELETE /api/plans/[planId]
 * Deletes a plan.
 */
export async function DELETE(request, { params }) {
    try {
        const { planId } = params
        
        if (isNaN(parseInt(planId, 10))) {
            return NextResponse.json({ success: false, error: 'Invalid plan ID' }, { status: 400 })
        }
        
        const [deletedPlan] = await db
            .delete(plans)
            .where(eq(plans.id, parseInt(planId, 10)))
            .returning()
        
        if (!deletedPlan) {
            return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 })
        }
        
        return NextResponse.json({ success: true, message: 'Plan deleted successfully' })
    } catch (error) {
        console.error('Error deleting plan:', error)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
