import { NextResponse } from 'next/server'
import db from '@/db/index'
import * as schemas from '@/db/schema'
import dayjs, { Dayjs } from 'dayjs'
import { withAuth } from '@/lib/auth'
import { SegmentInsert, TripInsert } from '@/types'

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

export const POST = withAuth(async (request, { auth }) => {
    
    try {
        
        const { userId } = auth
        
        const body = await request.json()
        
        if (!body || !body.type || !body.trips)
            return NextResponse.json({ success: false, error: 'Invalid backup payload' }, { status: 400 })
        
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
                            
                            const segmentInsertData: SegmentInsert = {
                                tripId: newTrip.id,
                                planId: newPlan.id,
                                name: seg.name || 'Imported Segment',
                                description: seg.description || null,
                                startDate: toDate(seg.startDate),
                                endDate: toDate(seg.endDate),
                                coordsLat: seg.coords?.lat ?? null,
                                coordsLng: seg.coords?.lng ?? null,
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
        
        return NextResponse.json({ success: true, data: results })
        
    } catch (e) {
        
        console.error('Error restoring backup:', e)
        return NextResponse.json({ success: false, error: (e as Error).message }, { status: 500 })
        
    }
    
})
