import { NextResponse } from 'next/server'
import db from '@/db/index'
import * as schemas from '@/db/schema'
import { eq } from 'drizzle-orm'
import { withAuth, isUserTripMember } from '@/lib/auth'

/**
 * GET /api/plans/[planId]
 * Fetches a single plan.
 */
export const GET = withAuth(async (request, { params, auth }) => {
    
    try {
        
        const { planId } = await params
        const body = await request.json()
        
        const { tripId } = body
        
        const isMember = await isUserTripMember(auth, tripId)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        if (isNaN(parseInt(planId, 10)))
            return NextResponse.json({ success: false, error: 'Invalid plan ID' }, { status: 400 })
        
        const [plan] = await db.select().from(schemas.plans).where(eq(schemas.plans.id, parseInt(planId, 10)))
        
        if (!plan)
            return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 })
        
        return NextResponse.json({ success: true, data: plan })
        
    } catch (e) {
        
        console.error('Error fetching plan:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})

/**
 * PUT /api/plans/[planId]
 * Updates a plan.
 */
export const PUT = withAuth(async (request, { params, auth }) => {
    
    try {
        
        const { planId } = await params
        const body = await request.json()
        
        const tripId = body.tripId
        
        if (isNaN(parseInt(planId, 10)))
            return NextResponse.json({ success: false, error: 'Invalid plan ID' }, { status: 400 })
        
        const isMember = await isUserTripMember(auth, tripId)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
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
        
        if (!updatedPlan)
            return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 })
        
        return NextResponse.json({ success: true, data: updatedPlan, message: 'Plan updated successfully' })
        
    } catch (e) {
        
        console.error('Error updating plan:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})

/**
 * DELETE /api/plans/[planId]
 * Deletes a plan.
 */
export const DELETE = withAuth(async (request, { params, auth }) => {
    
    try {
        
        const { planId } = await params
        
        if (isNaN(parseInt(planId, 10)))
            return NextResponse.json({ success: false, error: 'Invalid plan ID' }, { status: 400 })
        
        const [plan] = await db
            .select()
            .from(schemas.plans)
            .where(eq(schemas.plans.id, parseInt(planId, 10)))
        
        if (!plan)
            return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 })
        
        const isMember = await isUserTripMember(auth, plan.tripId)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        const [deletedPlan] = await db
            .delete(schemas.plans)
            .where(eq(schemas.plans.id, parseInt(planId, 10)))
            .returning()
        
        if (!deletedPlan)
            return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 })
        
        return NextResponse.json({ success: true, message: 'Plan deleted successfully' })
        
    } catch (e) {
        
        console.error('Error deleting plan:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})
