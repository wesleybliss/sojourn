import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import {
    getTripById,
    getTripWithDetails,
    getTripsByUserId,
} from '@/db/repos/trips.js'
import Ajv from 'ajv'
import tripsWithPlansSchema from '@/lib/json-schemas/trip-backup.jsonschema.js'

const toIso = ts => {
    if (ts === null) return null
    const n = Number(ts)
    if (Number.isNaN(n)) return null
    const ms = n < 1e12 ? n * 1000 : n
    return new Date(ms).toISOString()
}

const transformSegment = seg => ({
    id: String(seg.id),
    name: seg.name,
    color: seg.color,
    coords: {
        lat: seg.coordsLat === null ? null : Number(seg.coordsLat),
        lng: seg.coordsLng === null ? null : Number(seg.coordsLng),
    },
    tripId: String(seg.tripId),
    planId: seg.planId ? String(seg.planId) : undefined,
    createdAt: toIso(seg.createdAt),
    updatedAt: toIso(seg.updatedAt),
    startDate: toIso(seg.startDate),
    endDate: toIso(seg.endDate),
    stayBooked: Boolean(seg.stayBooked),
    flightBooked: Boolean(seg.flightBooked),
    description: seg.description || '',
})

const transformPlan = plan => ({
    id: plan.id ? String(plan.id) : undefined,
    name: plan.name,
    tripId: plan.tripId ? String(plan.tripId) : undefined,
    createdAt: toIso(plan.createdAt),
    updatedAt: toIso(plan.updatedAt),
    segments: Array.isArray(plan.segments) ? plan.segments.map(transformSegment) : [],
})

const transformTrip = trip => ({
    id: String(trip.id),
    name: trip.name,
    endDate: toIso(trip.endDate),
    segments: Array.isArray(trip.segments) ? trip.segments.map(transformSegment) : [],
    createdAt: toIso(trip.createdAt),
    startDate: toIso(trip.startDate),
    updatedAt: toIso(trip.updatedAt),
    description: trip.description || '',
    coverImageUrl: trip.coverImageUrl || null,
    plans: Array.isArray(trip.plans) ? trip.plans.map(transformPlan) : [],
})

export async function POST(request, opts) {
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
        
        if (!token || !token.sub)
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        
        const userId = parseInt(String(token.sub), 10)
        
        if (Number.isNaN(userId))
            return NextResponse.json({ success: false, error: 'Invalid user ID' }, { status: 400 })
        
        const body = await request.json()
        
        const ajv = new Ajv()
        const validate = ajv.compile(tripsWithPlansSchema)
        
        let trips = []
        
        if (body?.type === 'single') {
            const tripId = body.tripId
            
            if (!tripId)
                return NextResponse.json({
                    success: false,
                    error: 'tripId required for single backup',
                }, { status: 400 })
            
            const trip = await getTripWithDetails(Number(tripId))
            
            if (!trip)
                return NextResponse.json({ success: false, error: 'Trip not found' }, { status: 404 })
            
            if (Number(trip.userId) !== userId)
                return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
            
            trips = [transformTrip(trip)]
        } else {
            // multiple
            const requestedIds = Array.isArray(body?.tripIds) ? body.tripIds.map(id => Number(id)) : null
            
            const userTrips = await getTripsByUserId(userId)
            
            const filtered = requestedIds ? userTrips.filter(t => requestedIds.includes(Number(t.id))) : userTrips
            
            const detailsPromises = filtered.map(t => getTripWithDetails(Number(t.id)))
            const details = await Promise.all(detailsPromises)
            
            trips = details.filter(Boolean).map(t => transformTrip(t))
        }
        
        const data = { type: 'multiple', trips }
        
        const valid = validate(data)
        
        if (!valid)
            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                details: validate.errors,
            }, { status: 400 })
        
        const fileName = `trips-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
        
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="${fileName}"`,
            },
        })
        
    } catch (e) {
        console.error('Error creating backup:', e)
        return NextResponse.json({ success: false, error: e.message }, { status: 500 })
    }
    
}
