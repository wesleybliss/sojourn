'use server'

import {
    getAllTrips,
    createTrip as createTripQuery,
    deleteTrip as deleteTripQuery,
} from '@/lib/api/tripQueries.js'

/**
 * Server action: fetch list of trips from the database.
 * @returns {Promise<Trip[]>}
 */
export async function getTrips() {
    try {
        const trips = await getAllTrips()
        
        return trips
    } catch (error) {
        throw new Error(error.message || 'Failed to load trips')
    }
}

/**
 * Server action: create a new trip record.
 * @param {Object} tripData
 * @returns {Promise<Trip>}
 */
export async function createTrip(tripData) {
    try {
        const newTrip = await createTripQuery({
            name: tripData.name || 'Untitled Trip',
            description: tripData.description || '',
            startDate: tripData.startDate || null,
            endDate: tripData.endDate || null,
            coverImageUrl: tripData.coverImageUrl || null,
        })
        
        return newTrip
    } catch (error) {
        throw new Error(error.message || 'Failed to create trip')
    }
}

/**
 * Server action: delete a trip by its ID.
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export async function deleteTrip(id) {
    try {
        await deleteTripQuery(parseInt(id, 10))
    } catch (error) {
        throw new Error(error.message || 'Failed to delete trip')
    }
}
