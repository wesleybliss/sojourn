import db from '@repo/shared/db/index'
import plansRepo from '@repo/shared/db/repos/plans'
import segmentsRepo from '@repo/shared/db/repos/segments'
import tripsRepo from '@repo/shared/db/repos/trips'
import * as schemas from '@repo/shared/db/schema'
import { createTripRequestSchema } from '@repo/shared/types'
import { withAuth } from '@repo/shared/utils/auth'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'

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
        
        return NextResponse.json({
            success: true,
            data: trips,
            count: trips?.length || 0,
        })
        
    } catch (e) {
        
        console.error('Error getting trips:', e)
        return NextResponse.json(
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
        
        const tripData = createTripRequestSchema.parse(
            await request.json(),
        )
        
        const newTripPayload = {
            userId,
            name: tripData.name || 'Untitled Trip',
            description: tripData.description || '',
            /*startDate: tripData.startDate || null,
            endDate: tripData.endDate || null,*/
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
            startDate: dayjs().toDate(),
            endDate: dayjs().add(5, 'day').toDate(),
            color: 'bg-blue-500',
        })
        
        return NextResponse.json(
            {
                success: true,
                data: trip,
                message: 'Trip created successfully',
            },
            { status: 201 })
        
    } catch (e) {
        
        console.error('Error creating trip:', e)
        return NextResponse.json(
            { success: false, error: (e as Error).message },
            { status: 500 })
        
    }
    
})
