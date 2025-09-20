import { db } from '@/db'
import { plans, segments } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function createPlan(data) {
    const [newPlan] = await db.insert(plans).values(data).returning()
    
    return newPlan
}

/*
export const useUpdatePlan = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ planId, ...planData }) => {
            const res = await fetch(`/api/plans/${planId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planData),
            })
            
            if (!res.ok) throw new Error('Failed to update plan')
            return res.json()
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['plan', variables.planId])
            queryClient.invalidateQueries(['plans'])
        },
    })
}
 */

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
    
    delete plan.id
    
    const [newPlan] = await db.insert(plans).values(plan).returning()
    
    if (plan.segments.length > 0) {
        const newSegments = plan.segments.map(segment => {
            delete segment.id
            delete segment.planId
            
            return {
                ...segment,
                planId: newPlan.id,
            }
        })
        
        await db.insert(segments).values(newSegments)
    }
    
    return newPlan
}
