import { db } from '@/db2'
import { plans, segments } from '@/db2/schema'
import { eq } from 'drizzle-orm'

export async function createPlan(data) {
    const [newPlan] = await db.insert(plans).values(data).returning()
    
    return newPlan
}

export async function deletePlan(id) {
    await db.delete(segments).where(eq(segments.planId, id))
    await db.delete(plans).where(eq(plans.id, id))
}

export async function clonePlan(id) {
    const plan = await db.query.plans.findFirst({
        where: eq(plans.id, id),
        with: {
            segments: true,
        },
    })
    
    if (!plan) {
        throw new Error('Plan not found')
    }
    
    const { id: planId, ...planData } = plan
    
    const [newPlan] = await db.insert(plans).values(planData).returning()
    
    if (plan.segments.length > 0) {
        const newSegments = plan.segments.map(segment => {
            const { id: segmentId, planId: oldPlanId, ...segmentData } = segment
            
            return {
                ...segmentData,
                planId: newPlan.id,
            }
        })
        
        await db.insert(segments).values(newSegments)
    }
    
    return newPlan
}
