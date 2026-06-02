import db from '@repo/shared/db/index'
import * as schemas from '@repo/shared/db/schema'
import type { SegmentInsert, TripInsert } from '@repo/shared/types'
import { geocode } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { type AuthContext, withAuth } from '@repo/shared/utils/auth'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { Request, Response } from 'express'

const toDate = (v: string | number | Date | Dayjs | null | undefined) => {
    const value = dayjs(v).toDate()
    const year = value.getFullYear()
    const month = value.getMonth() + 1  // Months are zero-indexed, so add 1
    const day = value.getDate()
    const hour = value.getHours()
    const minutes = value.getMinutes()
    const seconds = value.getSeconds()
    console.log(v, year, month, day, hour, minutes, seconds)
    return value
}

export const restoreTrips = withAuth(async (
    req: Request,
    res: Response,
    context: AuthContext,
): Promise<void> => {
    
    try {
        
        const { userId } = context
        
        const body = req.body
        
        if (!body || !body.type || !body.trips)
            return apiResponse.badRequest(res, 'Invalid backup payload')
        
        const onConflictAction = body.onConflictAction || 'duplicate'
        
        const trips = Array.isArray(body.trips) ? body.trips : []
        
        const results = []
        
        // For each trip in backup, create trip, plans and segments
        for (const trip of trips) {
            let tripName = trip.name || 'Imported Trip'
            
            if (onConflictAction === 'duplicate')
                tripName = `${tripName} (Copy ${dayjs().format('YYYY-MMM-DD')})`
            
            console.log('Importing trip', tripName)
            
            const tripInsertData: TripInsert = {
                userId,
                name: tripName,
                description: trip.description || null,
                /*startDate: trip.startDate || null,
                endDate: trip.endDate || null,*/
                coverImageUrl: trip.coverImageUrl || null,
            }
            
            const insertedTrips = await db
                .insert(schemas.trips)
                .values(tripInsertData)
                .returning({ id: schemas.trips.id })
            
            const newTrip = insertedTrips[0]
            
            // link user to trip via userTrips
            await db.insert(schemas.userTrips).values({ userId, tripId: newTrip.id })
            
            const planIdMap = new Map()
            
            if (Array.isArray(trip.plans)) {
                
                for (const plan of trip.plans) {
                    
                    console.log('Inserting plan', plan.name)
                    
                    const insertedPlans = await db
                        .insert(schemas.plans)
                        .values({
                            tripId: newTrip.id,
                            name: plan.name,
                            description: plan.description || null,
                        })
                        .returning({ id: schemas.plans.id })
                    
                    const newPlan = insertedPlans[0]
                    
                    if (plan.id) planIdMap.set(String(plan.id), newPlan.id)
                    
                    // insert segments for this plan
                    if (Array.isArray(plan.segments)) {
                        
                        console.log('Importing', plan.segments.length, 'segments for plan', plan.name)
                        
                        for (const seg of plan.segments) {
                            
                            let latitude: number | null = null
                            let longitude: number | null = null
                            if (seg.coords?.lat !== null && seg.coords?.lng !== null) {
                                latitude = seg.coords.lat
                                longitude = seg.coords.lng
                            } else {
                                try {
                                    const geoResult = await geocode(seg.name || 'Imported Segment')
                                    if (geoResult) {
                                        latitude = geoResult.lat
                                        longitude = geoResult.lng
                                    }
                                } catch (geoError) {
                                    console.warn('Geocoding failed for segment name:', seg.name, geoError)
                                }
                            }
                            
                            const segmentInsertData: SegmentInsert & {
                                startDate: Date
                                endDate: Date
                            } = {
                                tripId: newTrip.id,
                                planId: newPlan.id,
                                name: seg.name || 'Imported Segment',
                                description: seg.description || null,
                                startDate: toDate(seg.startDate) as Date,
                                endDate: toDate(seg.endDate) as Date,
                                coordsLat: latitude,
                                coordsLng: longitude,
                                color: seg.color || 'bg-blue-500',
                                flightBooked: seg.flightBooked,
                                stayBooked: seg.stayBooked,
                                isShengenRegion: seg.isShengenRegion,
                            }
                            
                            await db.insert(schemas.segments).values(segmentInsertData)
                            
                        }
                        
                    }
                    
                }
                
            }
            
            results.push({ importedTripId: newTrip.id, name: tripName })
        }
        
        return apiResponse.ok(res, { data: results })
        
    } catch (e) {
        
        console.error('Error restoring backup:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
