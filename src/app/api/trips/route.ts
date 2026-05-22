import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth'
import tripsRepo from '@/db/repos/trips'
import plansRepo from '@/db/repos/plans'
import segmentsRepo from '@/db/repos/segments'
import db from '@/db/index'
import * as schemas from '@/db/schema'
import dayjs from 'dayjs'

/**
 * GET /api/trips
 * Returns the list of trips in JSON format.
 */
export const GET = withAuth(async (request, { auth }) => {
    
    try {
        
        const { userId } = auth
        
        const { searchParams } = new URL(request.url)
        const withCounts = searchParams.get('withCounts') === 'true'
        
        const trips = withCounts
            ? await tripsRepo.findAllByUserIdWithSegmentCount(userId, segmentsRepo)
            : await tripsRepo.findAllByUserId(userId)
        
        return NextResponseon({
            success: true,
            data: trips,
            count: trips.length,
        })
        
    } catch (e) {
        
        console.error('Error getting trips:', e)
        return NextResponseon(
            { success: false, error: (e as Error).message },
            { status: 500 },
        )
        
    }
    
})

/**
 * POST /api/trips
 * Creates a new trip.
 */
export const POST = withAuth(async (request, { auth }) => {
    
    try {
        
        const { userId } = auth
        
        const tripData = await requeston()
        
        const newTripPayload = {
            userId,
            name: tripData.name || 'Untitled Trip',
            description: tripData.description || '',
            startDate: tripData.startDate || null,
            endDate: tripData.endDate || null,
            coverImageUrl: tripData.coverImageUrl || null,
        }
        
        // Create trip
        const trip = await tripsRepo.create(newTripPayload)
        
        // Link user to trip
        await db.insert(schemas.userTrips).values({
            userId,
            tripId: trip.id,
        })
        
        // Create default plan
        const plan = await plansRepo.create({
            tripId: trip.id,
            name: dayjs().format('MMMM YYYY'),
            description: '',
        })
        
        // Create default segment
        await segmentsRepo.create({
            tripId: trip.id,
            planId: plan.id,
            name: 'First Stop',
            description: '',
            // order: 1,
            startDate: dayjs().format('YYYY-MM-DD'),
            endDate: dayjs().add(5, 'day').format('YYYY-MM-DD'),
            color: 'bg-blue-500',
        })
        
        const newTrip = trip
        
        return NextResponseon(
            {
                success: true,
                data: newTrip,
                message: 'Trip created successfully',
            },
            { status: 201 })
        
    } catch (e) {
        
        console.error('Error creating trip:', e)
        return NextResponseon(
            { success: false, error: (e as Error).message },
            { status: 500 })
        
    }
    
})
