"use server"
import {
    getTrips as fetchTrips,
    createTrip as createTripQuery,
    deleteTrip as deleteTripQuery,
} from '@/lib/api/serverFunctions'

/**
 * Server action: fetch list of trips from the database.
 * @returns {Promise<import('@/lib/api/serverFunctions').Trip[]>}
 */
export async function getTrips() {
    const result = await fetchTrips()
    if (!result.success) {
        throw new Error(result.error || 'Failed to load trips')
    }
    return result.data
}

/**
 * Server action: create a new trip record.
 * @param {Omit<import('@/lib/api/serverFunctions').TripData, 'id'>} tripData
 * @returns {Promise<import('@/lib/api/serverFunctions').Trip>}
 */
export async function createTrip(tripData) {
    const result = await createTripQuery(tripData)
    if (!result.success) {
        throw new Error(result.error || 'Failed to create trip')
    }
    return result.data
}

/**
 * Server action: delete a trip by its ID.
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export async function deleteTrip(id) {
    const result = await deleteTripQuery(id)
    if (!result.success) {
        throw new Error(result.error || 'Failed to delete trip')
    }
}
