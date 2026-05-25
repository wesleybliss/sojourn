import { asc, desc, eq, inArray, InferInsertModel } from 'drizzle-orm'

import db from '@/db'
import * as schemas from '@/db/schema'
import { ID, PlanInsert, Segment, SegmentInsert, TripInsert } from '@/types'

const normalizeDateValue = (v: Date | string | number | null) => {
    if (!v) return null
    if (typeof v === 'string') return v
    if (v instanceof Date) return v.getTime()
    
    if (typeof v === 'number') {
        return v < 1e12 ? v * 1000 : v
    }
    
    return v
}


// Get all trips
export const getAllTrips = async () => {
    try {
        return await db
            .select()
            .from(schemas.trips)
            .orderBy(desc(schemas.trips.id))
    } catch (error) {
        console.error('Error fetching trips:', error)
        throw new Error('Failed to fetch trips')
    }
}

// Get trips for a specific user
export const getTripsByUserId = async (userId: ID) => {
    try {
        const trips = await db
            .select({ trip: schemas.trips })
            .from(schemas.trips)
            .innerJoin(
                schemas.userTrips,
                eq(schemas.userTrips.tripId, schemas.trips.id),
            )
            .where(eq(schemas.userTrips.userId, userId))
            .orderBy(desc(schemas.trips.id))
        
        return trips.map(result => result.trip)
    } catch (error) {
        console.error(`Error fetching trips for user ${userId}:`, error)
        throw new Error('Failed to fetch trips')
    }
}

// Get trips with segment count for a specific user
export const getTripsWithSegmentCountByUserId = async (userId: ID) => {
    try {
        const trips = await getTripsByUserId(userId)
        
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
        console.error(`Error fetching trips with segment counts for user ${userId}:`, error)
        throw new Error('Failed to fetch trips with segment counts')
    }
}

// Get a single trip by ID
export const getTripById = async (id: ID) => {
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
export const getSegmentsByTripId = async (tripId: ID) => {
    try {
        const segments = await db
            .select()
            .from(schemas.segments)
            .where(eq(schemas.segments.tripId, tripId))
            .orderBy(asc(schemas.segments.startDate))
        
        return segments.map((s: Segment) => ({
            ...s,
            startDate: normalizeDateValue(s.startDate as Date),
            endDate: normalizeDateValue(s.endDate as Date),
        }))
    } catch (error) {
        console.error(`Error fetching segments for trip ${tripId}:`, error)
        throw new Error('Failed to fetch segments')
    }
}

// Get segments for a specific plan
export const getSegmentsByPlanId = async (planId: ID) => {
    try {
        const segments = await db
            .select()
            .from(schemas.segments)
            .where(eq(schemas.segments.planId, planId))
            .orderBy(asc(schemas.segments.startDate))
        
        return segments.map(s => ({
            ...s,
            startDate: normalizeDateValue(s.startDate as Date),
            endDate: normalizeDateValue(s.endDate as Date),
        }))
    } catch (error) {
        console.error(`Error fetching segments for plan ${planId}:`, error)
        throw new Error('Failed to fetch segments')
    }
}

// Get plans for a specific trip
export const getPlansByTripId = async (tripId: ID) => {
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
                    startDate: normalizeDateValue(segment.startDate as Date),
                    endDate: normalizeDateValue(segment.endDate as Date),
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
export const getPlanById = async (id: ID) => {
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

// Update a plan
export const updatePlan = async (id: ID, planData: Partial<PlanInsert>) => {
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
export const deletePlan = async (id: ID) => {
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
export const updateSegment = async (id: ID, segmentData: Partial<SegmentInsert>) => {
    try {
        const [updatedSegment] = await db
            .update(schemas.segments)
            .set({
                name: segmentData.name,
                description: segmentData.description,
                startDate: segmentData.startDate ? new Date(segmentData.startDate) : undefined,
                endDate: segmentData.endDate ? new Date(segmentData.endDate) : undefined,
                coordsLat: segmentData.coordsLat,
                coordsLng: segmentData.coordsLng,
                color: segmentData.color,
                flightBooked: segmentData.flightBooked,
                stayBooked: segmentData.stayBooked,
                isShengenRegion: segmentData.isShengenRegion,
            } as Partial<InferInsertModel<typeof schemas.segments>>)
            .where(eq(schemas.segments.id, id))
            .returning()
        
        return updatedSegment
    } catch (error) {
        console.error(`Error updating segment ${id}:`, error)
        throw new Error('Failed to update segment')
    }
}

// Delete segments
export const deleteSegments = async (ids: ID[]) => {
    try {
        await db
            .delete(schemas.segments)
            .where(inArray(schemas.segments.id, ids))
        
        return { success: true }
    } catch (error) {
        console.error('Error deleting segments:', error)
        throw new Error('Failed to delete segments')
    }
}

// Create a new trip
export const createTrip = async (
    tripData: TripInsert,
    tx: typeof db | null = null,
) => {
    try {
        const [newTrip] = await (tx || db)
            .insert(schemas.trips)
            .values({
                userId: tripData.userId,
                name: tripData.name,
                description: tripData.description,
                /*startDate: tripData.startDate,
                endDate: tripData.endDate,*/
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
export const updateTrip = async (id: ID, tripData: Partial<TripInsert>) => {
    try {
        const [updatedTrip] = await db
            .update(schemas.trips)
            .set({
                name: tripData.name,
                description: tripData.description,
                /*startDate: tripData.startDate,
                endDate: tripData.endDate,*/
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
export const deleteTrip = async (id: ID) => {
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
export const getTripWithDetails = async (id: ID) => {
    try {
        const trip = await getTripById(id)
        
        if (!trip) return null
        
        const plans = await getPlansByTripId(id)
        
        return {
            ...trip,
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
        
        return segments.map(s => ({
            ...s,
            startDate: normalizeDateValue(s.startDate as Date),
            endDate: normalizeDateValue(s.endDate as Date),
        }))
    } catch (error) {
        console.error('Error fetching all segments:', error)
        throw new Error('Failed to fetch all segments')
    }
}
