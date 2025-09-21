import { NextResponse } from 'next/server'
import db from '@/db/index'
import * as schemas from '@/db/schema'
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
        
        const [plan] = await db.select().from(schemas.plans).where(eq(schemas.plans.id, parseInt(planId, 10)))
        
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
        
        if (isNaN(parseInt(planId, 10)))
            return NextResponse.json({ success: false, error: 'Invalid plan ID' }, { status: 400 })
        
        const [plan] = await db.select().from(schemas.plans).where(eq(schemas.plans.id, parseInt(planId, 10)))
        
        if (!plan)
            return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 })
        
        const planData = await request.json()
        
        const [updatedPlan] = await db
            .update(schemas.plans)
            .set({
                name: planData.name,
                description: planData.description,
            })
            .where(eq(schemas.plans.id, parseInt(planId, 10)))
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
            .delete(schemas.plans)
            .where(eq(schemas.plans.id, parseInt(planId, 10)))
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
