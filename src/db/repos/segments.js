import db from '@/db/index.js'
import * as schemas from '@/db/schema.js'
import { eq, asc, inArray } from 'drizzle-orm'

const normalizeDateValue = v => {
    if (!v) return null
    if (typeof v === 'string') return v
    if (v instanceof Date) return v.getTime()
    
    if (typeof v === 'number') {
        return v < 1e12 ? v * 1000 : v
    }
    
    return v
}

export const getSegmentById = async id => {
    try {
        const [segment] = await db
            .select()
            .from(schemas.segments)
            .where(eq(schemas.segments.id, id))
        
        return segment || null
    } catch (error) {
        console.error(`Error fetching segment ${id}:`, error)
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
        
        return segments.map(s => ({
            ...s,
            startDate: normalizeDateValue(s.startDate),
            endDate: normalizeDateValue(s.endDate),
        }))
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
        
        return segments.map(s => ({
            ...s,
            startDate: normalizeDateValue(s.startDate),
            endDate: normalizeDateValue(s.endDate),
        }))
    } catch (error) {
        console.error(`Error fetching segments for plan ${planId}:`, error)
        throw new Error('Failed to fetch segments')
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
            startDate: normalizeDateValue(s.startDate),
            endDate: normalizeDateValue(s.endDate),
        }))
    } catch (error) {
        console.error('Error fetching all segments:', error)
        throw new Error('Failed to fetch all segments')
    }
}

// Create a new segment
export const createSegment = async (segmentData, tx) => {
    try {
        const [newSegment] = await (tx || db)
            .insert(schemas.segments)
            .values({
                tripId: segmentData.tripId,
                planId: segmentData.planId,
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
            .returning()
        
        return newSegment
    } catch (error) {
        console.error('Error creating segment:', error)
        throw new Error('Failed to create segment')
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
            .where(inArray(schemas.segments.id, ids))
        
        return { success: true }
    } catch (error) {
        console.error('Error deleting segments:', error)
        throw new Error('Failed to delete segments')
    }
}
