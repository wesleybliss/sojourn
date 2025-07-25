import db from '@/db2/index.js'
import * as schemas from '@/db2/schema.js'
import { eq, desc, asc } from 'drizzle-orm'
import * as store from '@/store'

const idToInt = obj => obj?.id ? parseInt(obj?.id, 10) : null

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
export const getTripById = async (id, updateStore = false) => {
    try {
        const [trip] = await db
            .select()
            .from(schemas.trips)
            .where(eq(schemas.trips.id, id))
        
        if (updateStore)
            store.currentTripId.setValue(idToInt(trip))
        
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

// Get segments for a specific plan
export const getSegmentsByPlanId = async planId => {
    try {
        const segments = await db
            .select()
            .from(schemas.segments)
            .where(eq(schemas.segments.planId, planId))
            .orderBy(asc(schemas.segments.startDate))
        
        return segments
    } catch (error) {
        console.error(`Error fetching segments for plan ${planId}:`, error)
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

// Get a single plan by ID
export const getPlanById = async (id, updateStore = false) => {
    try {
        const [plan] = await db
            .select()
            .from(schemas.plans)
            .where(eq(schemas.plans.id, id))
        
        if (updateStore)
            store.currentPlanId.setValue(idToInt(plan))
        
        return plan || null
    } catch (error) {
        console.error(`Error fetching plan ${id}:`, error)
        throw new Error('Failed to fetch plan')
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

// Update a segment
export const updateSegment = async (id, segmentData) => {
    try {
        const [updatedSegment] = await db
            .update(schemas.segments)
            .set({
                name: segmentData.name,
                description: segmentData.description,
                startDate: segmentData.startDate,
                endDate: segmentData.endDate,
                coordsLat: segmentData.coordsLat,
                coordsLng: segmentData.coordsLng,
                color: segmentData.color,
                flightBooked: segmentData.flightBooked,
                stayBooked: segmentData.stayBooked,
                isShengenRegion: segmentData.isShengenRegion,
            })
            .where(eq(schemas.segments.id, id))
            .returning()
        
        return updatedSegment
    } catch (error) {
        console.error(`Error updating segment ${id}:`, error)
        throw new Error('Failed to update segment')
    }
}

// Delete segments
export const deleteSegments = async ids => {
    try {
        await db
            .delete(schemas.segments)
            .where(schemas.segments.id.in(ids))
        
        return { success: true }
    } catch (error) {
        console.error('Error deleting segments:', error)
        throw new Error('Failed to delete segments')
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

// Get all segments from all trips
export const getAllSegments = async () => {
    try {
        const segments = await db
            .select()
            .from(schemas.segments)
            .orderBy(asc(schemas.segments.id))
        
        return segments
    } catch (error) {
        console.error('Error fetching all segments:', error)
        throw new Error('Failed to fetch all segments')
    }
}
