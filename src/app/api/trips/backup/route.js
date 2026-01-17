import { NextResponse } from 'next/server'
import tripsRepo from '@/db/repos/trips'
import plansRepo from '@/db/repos/plans'
import Ajv from 'ajv'
import tripsWithPlansSchema from '@/lib/json-schemas/trip-backup.jsonschema'
import dayjs from 'dayjs'
import { isUserTripMember, withAuth } from '@/lib/auth'

const ajvDebug = true

const dateToString = (date, name = '') => {
    
    const val = dayjs(date).format()
    
    if (name)
        console.log('dateToString', name, date, val)
    
    return val
    
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
    createdAt: dateToString(seg.createdAt, 'seg/createdAt'),
    updatedAt: dateToString(seg.updatedAt, 'seg/updatedAt'),
    startDate: dateToString(seg.startDate, 'seg/startDate'),
    endDate: dateToString(seg.endDate, 'seg/endDate'),
    stayBooked: Boolean(seg.stayBooked),
    flightBooked: Boolean(seg.flightBooked),
    description: seg.description || '',
})

const transformPlan = plan => ({
    id: plan.id ? String(plan.id) : undefined,
    name: plan.name,
    tripId: plan.tripId ? String(plan.tripId) : undefined,
    createdAt: dateToString(plan.createdAt, 'plan/createdAt'),
    updatedAt: dateToString(plan.updatedAt, 'plan/updatedAt'),
    segments: Array.isArray(plan.segments) ? plan.segments.map(transformSegment) : [],
})

const transformTrip = trip => ({
    id: String(trip.id),
    createdAt: dateToString(trip.createdAt, 'trip/createdAt'),
    updatedAt: dateToString(trip.updatedAt, 'trip/updatedAt'),
    name: trip.name,
    description: trip.description || '',
    coverImageUrl: trip.coverImageUrl || null,
    plans: Array.isArray(trip.plans) ? trip.plans.map(transformPlan) : [],
    segments: Array.isArray(trip.segments) ? trip.segments.map(transformSegment) : [],
})

export const POST = withAuth(async (request, { auth }) => {
    
    try {
        
        const { userId } = auth
        
        const body = await request.json()
        const ajvProps = ajvDebug ? { allErrors: true, verbose: true } : {}
        
        const ajv = new Ajv(ajvProps)
        const validate = ajv.compile(tripsWithPlansSchema)
        
        let trips = []
        
        if (body?.type === 'single') {
            
            const tripId = body.tripId
            
            if (!tripId)
                return NextResponse.json({
                    success: false,
                    error: 'tripId required for single backup',
                }, { status: 400 })
            
            const isMember = await isUserTripMember(auth, tripId)
            
            if (!isMember)
                return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
            
            const trip = await tripsRepo.findOneWithDetails(Number(tripId), plansRepo)
            
            if (!trip)
                return NextResponse.json({ success: false, error: 'Trip not found' }, { status: 404 })
            
            trips = [transformTrip(trip)]
            
        } else {
            
            // multiple
            const requestedIds = Array.isArray(body?.tripIds) ? body.tripIds.map(id => Number(id)) : null
            
            const userTrips = await tripsRepo.findAllByUserId(userId)
            
            const filtered = requestedIds ? userTrips.filter(t => requestedIds.includes(Number(t.id))) : userTrips
            
            const detailsPromises = filtered.map(t => tripsRepo.findOneWithDetails(Number(t.id)), plansRepo)
            const details = await Promise.all(detailsPromises)
            
            trips = details.filter(Boolean).map(t => transformTrip(t))
            
        }
        
        let data = { type: 'multiple', trips }
        
        const valid = validate(data)
        
        if (!valid || !data.trips[0].plans[0].segments[0].startDate.startsWith('2025'))
            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                details: validate.errors,
            }, { status: 400 })
        
        data = JSON.stringify(data, null, 4)
        
        const fileName = `trips-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
        
        return new Response(data, {
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
    
})
