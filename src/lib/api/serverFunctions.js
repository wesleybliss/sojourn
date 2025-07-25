import {
    getAllTrips,
    getTripById,
    getTripWithDetails,
    createTrip as createTripQuery,
    updateTrip as updateTripQuery,
    deleteTrip as deleteTripQuery,
    getTripsWithSegmentCount,
    getSegmentsByTripId,
    updateSegment as updateSegmentQuery,
} from './tripQueries.js'
import db from '@/db2/index.js'
import * as schemas from '@/db2/schema.js'
import { eq } from 'drizzle-orm'

// Server-side functions that can be called from the frontend
// These use the actual database queries instead of mock data

// Get all trips
export const getTrips = async () => {
    try {
        const trips = await getAllTrips()
        
        return {
            success: true,
            data: trips,
            count: trips.length,
        }
    } catch (error) {
        console.error('Server error getting trips:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Get a single trip
export const getTrip = async id => {
    try {
        const trip = await getTripById(parseInt(id, 10))
        
        if (!trip) {
            return {
                success: false,
                error: 'Trip not found',
            }
        }
        
        return {
            success: true,
            data: trip,
        }
    } catch (error) {
        console.error(`Server error getting trip ${id}:`, error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Get trip with all details
export const getTripDetails = async id => {
    try {
        const trip = await getTripWithDetails(parseInt(id, 10))
        
        if (!trip) {
            return {
                success: false,
                error: 'Trip not found',
            }
        }
        
        return {
            success: true,
            data: trip,
        }
    } catch (error) {
        console.error(`Server error getting trip details ${id}:`, error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Create a new trip
export const createTrip = async tripData => {
    try {
        const newTrip = await createTripQuery({
            name: tripData.name || 'Untitled Trip',
            description: tripData.description || '',
            startDate: tripData.startDate || null,
            endDate: tripData.endDate || null,
            coverImageUrl: tripData.coverImageUrl || null,
        })
        
        return {
            success: true,
            data: newTrip,
            message: 'Trip created successfully',
        }
    } catch (error) {
        console.error('Server error creating trip:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Update a trip
export const updateTrip = async (id, tripData) => {
    try {
        const updatedTrip = await updateTripQuery(parseInt(id, 10), tripData)
        
        if (!updatedTrip) {
            return {
                success: false,
                error: 'Trip not found',
            }
        }
        
        return {
            success: true,
            data: updatedTrip,
            message: 'Trip updated successfully',
        }
    } catch (error) {
        console.error(`Server error updating trip ${id}:`, error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Delete a trip
export const deleteTrip = async id => {
    try {
        await deleteTripQuery(parseInt(id, 10))
        return {
            success: true,
            message: 'Trip deleted successfully',
        }
    } catch (error) {
        console.error(`Server error deleting trip ${id}:`, error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Get trips with segment counts
export const getTripsWithCounts = async () => {
    try {
        const trips = await getTripsWithSegmentCount()
        
        return {
            success: true,
            data: trips,
            count: trips.length,
        }
    } catch (error) {
        console.error('Server error getting trips with counts:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Create a new plan
export const createPlan = async planData => {
    try {
        const [newPlan] = await db
            .insert(schemas.plans)
            .values({
                tripId: planData.tripId,
                name: planData.name || 'Untitled Plan',
                description: planData.description || '',
            })
            .returning()
        
        return {
            success: true,
            data: newPlan,
            message: 'Plan created successfully',
        }
    } catch (error) {
        console.error('Server error creating plan:', error)
        return {
            success: false,
            error: error.message,
        }
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
                planId: segmentData.planId,
            })
            .where(eq(schemas.segments.id, id))
            .returning()
        
        return {
            success: true,
            data: updatedSegment,
            message: 'Segment updated successfully',
        }
    } catch (error) {
        console.error(`Server error updating segment ${id}:`, error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Migrate trips to plans - server-side function
export const migrateTripsToPlans = async () => {
    try {
        const trips = await getAllTrips()
        const migrationResults = []
        
        for (const trip of trips) {
            console.log('Migrating trip:', trip.name)
            const segments = await getSegmentsByTripId(trip.id)
            
            let planId = null
            let migratedSegments = 0
            
            for (const segment of segments) {
                if (segment.planId) {
                    continue
                }
                
                if (!planId) {
                    console.log('Creating plan for trip:', trip.name)
                    const [newPlan] = await db
                        .insert(schemas.plans)
                        .values({
                            tripId: trip.id,
                            name: 'Plan #1',
                        })
                        .returning()
                    
                    planId = newPlan.id
                }
                
                console.log('Updating segment with plan ID:', planId)
                await db
                    .update(schemas.segments)
                    .set({ planId })
                    .where(eq(schemas.segments.id, segment.id))
                
                migratedSegments++
            }
            
            migrationResults.push({
                tripId: trip.id,
                tripName: trip.name,
                planId,
                migratedSegments,
            })
        }
        
        return {
            success: true,
            data: migrationResults,
            message: `Migration completed. ${migrationResults.length} trips processed.`,
        }
    } catch (error) {
        console.error('Server error during migration:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Export individual functions for direct use
export {
    getAllTrips,
    getTripById,
    getTripWithDetails,
    createTripQuery,
    updateTripQuery,
    deleteTripQuery,
    getTripsWithSegmentCount,
    getSegmentsByTripId,
    updateSegmentQuery,
}
