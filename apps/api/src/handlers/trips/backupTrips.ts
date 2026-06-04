import plansRepo from '@repo/shared/db/repos/plans'
import tripsRepo from '@repo/shared/db/repos/trips'
import type { Plan, Segment, Trip } from '@repo/shared/types'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember } from '@repo/shared/utils/auth'
import tripsWithPlansSchema from '@repo/shared/utils/json-schemas/trip-backup.jsonschema'
import Ajv from 'ajv'
import dayjs from 'dayjs'
import type { Request, Response } from 'express'

const ajvDebug = true

const dateToString = (date: Date, name: string = '') => {
    const val = dayjs(date).format()
    if (name)
        console.log('dateToString', name, date, val)
    return val
}

const transformSegment = (seg: Segment) => ({
    id: String(seg.id),
    name: seg.name,
    color: seg.color,
    coords: {
        lat: seg.coordsLat === null ? null : Number(seg.coordsLat),
        lng: seg.coordsLng === null ? null : Number(seg.coordsLng),
    },
    tripId: String(seg.tripId),
    planId: seg.planId ? String(seg.planId) : undefined,
    createdAt: dateToString(seg.createdAt as Date, 'seg/createdAt'),
    updatedAt: dateToString(seg.updatedAt as Date, 'seg/updatedAt'),
    startDate: dateToString(seg.startDate as Date, 'seg/startDate'),
    endDate: dateToString(seg.endDate as Date, 'seg/endDate'),
    stayBooked: Boolean(seg.stayBooked),
    flightBooked: Boolean(seg.flightBooked),
    description: seg.description || '',
})

const transformPlan = (plan: Plan) => ({
    id: plan.id ? String(plan.id) : undefined,
    name: plan.name,
    tripId: plan.tripId ? String(plan.tripId) : undefined,
    createdAt: dateToString(plan.createdAt as Date, 'plan/createdAt'),
    updatedAt: dateToString(plan.updatedAt as Date, 'plan/updatedAt'),
    segments: Array.isArray(plan.segments) ? plan.segments.map(transformSegment) : [],
})

const transformTrip = (trip: Trip) => ({
    id: String(trip.id),
    createdAt: dateToString(trip.createdAt as Date, 'trip/createdAt'),
    updatedAt: dateToString(trip.updatedAt as Date, 'trip/updatedAt'),
    name: trip.name,
    description: trip.description || '',
    coverImageUrl: trip.coverImageUrl || null,
    plans: Array.isArray(trip.plans) ? trip.plans.map(transformPlan) : [],
    segments: Array.isArray(trip.segments) ? trip.segments.map(transformSegment) : [],
})

export const backupTrips = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const userId = req.auth?.user?.id
        
        const body = req.body
        const ajvProps = ajvDebug ? { allErrors: true, verbose: true } : {}
        
        const ajv = new Ajv(ajvProps)
        const validate = ajv.compile(tripsWithPlansSchema)
        
        let trips = []
        
        if (body?.type === 'single') {
            
            const tripId = parseInt(body.tripId as string, 10)
            
            if (!tripId)
                return apiResponse.invalidParams(res, 'tripId required for single backup')
            
            const isMember = await isUserTripMember(req.auth, tripId)
            
            if (!isMember)
                return apiResponse.forbidden(res )
            
            const trip = await tripsRepo.findOneWithDetails(Number(tripId), plansRepo)
            
            if (!trip)
                return apiResponse.notFound(res, 'Trip not found')
            
            trips = [transformTrip(trip)]
            
        } else {
            
            // multiple
            const requestedIds = Array.isArray(body?.tripIds)
                ? body.tripIds.map((id: string) => Number(id))
                : null
            
            const userTrips = await tripsRepo.findAllByUserId(userId)
            
            const filtered = requestedIds
                ? userTrips.filter(t => requestedIds.includes(Number(t.id)))
                : userTrips
            
            const detailsPromises: Promise<Trip | null>[] = filtered.map(t => (
                tripsRepo.findOneWithDetails(Number(t.id), plansRepo)
            ))
            const details = await Promise.all(detailsPromises)
            
            trips = details.filter(Boolean).map(t => transformTrip(t!))
            
        }
        
        const data = { type: 'multiple', trips }
        
        const valid = validate(data)
        const currentYear = new Date().getFullYear().toString()
        
        if (!valid || !data.trips[0].plans[0].segments[0].startDate.startsWith(currentYear))
            return apiResponse.fail(res, 'Validation failed', 400, {
                data: {
                    details: validate.errors,
                },
            })
        
        const fileName = `trips-backup-${new Date().toISOString().replace(/[:.]/g, '-')}on`
        
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
        res.json(data)
        
    } catch (e) {
        console.error('Error creating backup:', e)
        return apiResponse.internalServerError(res)
    }
    
}
