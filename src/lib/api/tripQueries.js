import db from '../../db2/index.js'
import * as schemas from '../../db2/schema.js'
import { eq, desc, asc } from 'drizzle-orm'

// Get all trips
export const getAllTrips = async () => {
    try {
        const trips = await db
            .select()
            .from(schemas.trips)
            .orderBy(desc(schemas.trips.id))
        
        return trips
    } catch (error) {
        console.error('Error fetching trips:', error)
        throw new Error('Failed to fetch trips')
    }
}

// Get a single trip by ID
export const getTripById = async id => {
    try {
        const [trip] = await db
            .select()
            .from(schemas.trips)
            .where(eq(schemas.trips.id, id))
        
        return trip || null
    } catch (error) {
        console.error(`Error fetching trip ${id}:`, error)
        throw new Error('Failed to fetch trip')
    }
}

// Get segments for a specific trip
export const getSegmentsByTripId = async tripId => {
    try {
        const segments = await db
            .select()
            .from(schemas.segments)
            .where(eq(schemas.segments.tripId, tripId))
            .orderBy(asc(schemas.segments.startDate))
        
        return segments
    } catch (error) {
        console.error(`Error fetching segments for trip ${tripId}:`, error)
        throw new Error('Failed to fetch segments')
    }
}

// Get plans for a specific trip
export const getPlansByTripId = async tripId => {
    try {
        const plans = await db
            .select()
            .from(schemas.plans)
            .where(eq(schemas.plans.tripId, tripId))
            .orderBy(asc(schemas.plans.id))
        
        return plans
    } catch (error) {
        console.error(`Error fetching plans for trip ${tripId}:`, error)
        throw new Error('Failed to fetch plans')
    }
}

// Create a new trip
export const createTrip = async tripData => {
    try {
        const [newTrip] = await db
            .insert(schemas.trips)
            .values({
                name: tripData.name,
                description: tripData.description,
                startDate: tripData.startDate,
                endDate: tripData.endDate,
                coverImageUrl: tripData.coverImageUrl,
            })
            .returning()
        
        return newTrip
    } catch (error) {
        console.error('Error creating trip:', error)
        throw new Error('Failed to create trip')
    }
}

// Update a trip
export const updateTrip = async (id, tripData) => {
    try {
        const [updatedTrip] = await db
            .update(schemas.trips)
            .set({
                name: tripData.name,
                description: tripData.description,
                startDate: tripData.startDate,
                endDate: tripData.endDate,
                coverImageUrl: tripData.coverImageUrl,
            })
            .where(eq(schemas.trips.id, id))
            .returning()
        
        return updatedTrip
    } catch (error) {
        console.error(`Error updating trip ${id}:`, error)
        throw new Error('Failed to update trip')
    }
}

// Delete a trip
export const deleteTrip = async id => {
    try {
        await db
            .delete(schemas.trips)
            .where(eq(schemas.trips.id, id))
        
        return { success: true }
    } catch (error) {
        console.error(`Error deleting trip ${id}:`, error)
        throw new Error('Failed to delete trip')
    }
}

// Get trip with all related data (segments and plans)
export const getTripWithDetails = async id => {
    try {
        const trip = await getTripById(id)
        
        if (!trip) return null
        
        const [segments, plans] = await Promise.all([
            getSegmentsByTripId(id),
            getPlansByTripId(id),
        ])
        
        return {
            ...trip,
            segments,
            plans,
        }
    } catch (error) {
        console.error(`Error fetching trip details for ${id}:`, error)
        throw new Error('Failed to fetch trip details')
    }
}

// Get trips with basic segment count
export const getTripsWithSegmentCount = async () => {
    try {
        const trips = await getAllTrips()
        
        const tripsWithCounts = await Promise.all(
            trips.map(async trip => {
                const segments = await getSegmentsByTripId(trip.id)
                
                return {
                    ...trip,
                    segmentCount: segments.length,
                }
            }),
        )
        
        return tripsWithCounts
    } catch (error) {
        console.error('Error fetching trips with segment counts:', error)
        throw new Error('Failed to fetch trips with segment counts')
    }
}
