import db from '@/db/index.js'
import * as schemas from '@/db/schema.js'
import { eq, asc } from 'drizzle-orm'

const normalizeDateValue = v => {
    if (v == null) return null
    if (typeof v === 'string') return v
    if (v instanceof Date) return v.getTime()
    if (typeof v === 'number') {
        return v < 1e12 ? v * 1000 : v
    }
    return v
}


// Get plans for a specific trip
export const getPlansByTripId = async tripId => {
    try {
        const plansWithSegments = await db
            .select({
                plan: schemas.plans,
                segment: schemas.segments,
            })
            .from(schemas.plans)
            .leftJoin(schemas.segments, eq(schemas.segments.planId, schemas.plans.id))
            .where(eq(schemas.plans.tripId, tripId))
            .orderBy(asc(schemas.plans.id), asc(schemas.segments.startDate))
        
        // Group segments by plan
        const plansMap = new Map()
        
        plansWithSegments.forEach(({ plan, segment }) => {
            if (!plansMap.has(plan.id)) {
                plansMap.set(plan.id, {
                    ...plan,
                    segments: [],
                })
            }
            
            if (segment) {
                plansMap.get(plan.id).segments.push({
                    ...segment,
                    startDate: normalizeDateValue(segment.startDate),
                    endDate: normalizeDateValue(segment.endDate),
                })
            }
        })
        
        return Array.from(plansMap.values())
    } catch (error) {
        console.error(`Error fetching plans for trip ${tripId}:`, error)
        throw new Error('Failed to fetch plans')
    }
}

// Get a single plan by ID
export const getPlanById = async id => {
    try {
        const [plan] = await db
            .select()
            .from(schemas.plans)
            .where(eq(schemas.plans.id, id))
        
        return plan || null
    } catch (error) {
        console.error(`Error fetching plan ${id}:`, error)
        throw new Error('Failed to fetch plan')
    }
}

// Create a new plan
export const createPlan = async (planData) => {
    try {
        const [newPlan] = await db
            .insert(schemas.plans)
            .values({
                name: planData.name,
                description: planData.description,
                tripId: planData.tripId,
            })
            .returning()
        
        return newPlan
    } catch (error) {
        console.error('Error creating plan:', error)
        throw new Error('Failed to create plan')
    }
}

// Update a plan
export const updatePlan = async (id, planData) => {
    try {
        const [updatedPlan] = await db
            .update(schemas.plans)
            .set({
                name: planData.name,
                description: planData.description,
            })
            .where(eq(schemas.plans.id, id))
            .returning()
        
        return updatedPlan
    } catch (error) {
        console.error(`Error updating plan ${id}:`, error)
        throw new Error('Failed to update plan')
    }
}

// Delete a plan
export const deletePlan = async id => {
    try {
        await db
            .delete(schemas.plans)
            .where(eq(schemas.plans.id, id))
        
        return { success: true }
    } catch (error) {
        console.error(`Error deleting plan ${id}:`, error)
        throw new Error('Failed to delete plan')
    }
}
