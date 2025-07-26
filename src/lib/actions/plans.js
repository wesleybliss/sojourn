'use server'

import {
    createPlan as createPlanQuery,
    deletePlan as deletePlanQuery,
    clonePlan as clonePlanQuery,
} from '@/lib/queries/plans'

/**
 * Server action: create a new plan record.
 * @param {Object} planData
 * @returns {Promise<Plan>}
 */
export async function createPlan(planData) {
    try {
        const newPlan = await createPlanQuery({
            name: planData.name || 'Untitled Plan',
            tripId: planData.tripId,
        })
        
        return newPlan
    } catch (error) {
        throw new Error(error.message || 'Failed to create plan')
    }
}

/**
 * Server action: delete a plan by its ID.
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export async function deletePlan(id) {
    try {
        await deletePlanQuery(parseInt(id, 10))
    } catch (error) {
        throw new Error(error.message || 'Failed to delete plan')
    }
}

/**
 * Server action: clone a plan by its ID.
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export async function clonePlan(id) {
    try {
        await clonePlanQuery(parseInt(id, 10))
    } catch (error) {
        throw new Error(error.message || 'Failed to clone plan')
    }
}
