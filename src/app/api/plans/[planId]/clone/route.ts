import { NextResponse } from 'next/server'
import db from '@/db/index'
import * as schemas from '@/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { omit } from '@/utils'
import { withAuth } from '@/lib/auth'

export const POST = withAuth<{ planId: string }>(async (_, { params }) => {
    
    try {
        
        const { planId } = await params
        
        if (isNaN(parseInt(planId, 10)))
            return NextResponse.json({ success: false, error: 'Invalid plan ID' }, { status: 400 })
        
        const [plan] = await db.select().from(schemas.plans).where(eq(schemas.plans.id, parseInt(planId, 10)))
        
        if (!plan)
            return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 })
        
        const result = await db.transaction(async tx => {
            
            const [clonedPlan] = await tx
                .insert(schemas.plans)
                .values({
                    tripId: plan.tripId,
                    name: `${plan.name}-${nanoid()}`,
                    description: plan.description,
                })
                .returning()
            
            const segments = await db.select()
                .from(schemas.segments)
                .where(eq(schemas.segments.planId, parseInt(planId, 10)))
            
            const segmentInserts = segments.map(it => tx
                .insert(schemas.segments)
                .values({
                    ...omit(it, ['id', 'planId']),
                    planId: clonedPlan.id,
                }))
            
            await Promise.all(segmentInserts)
            
            return clonedPlan
            
        })
        
        return NextResponse.json(
            { success: true, data: result, message: 'Plan cloned successfully' },
            { status: 201 },
        )
        
    } catch (e) {
        
        console.error('Error updating plan:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
})
