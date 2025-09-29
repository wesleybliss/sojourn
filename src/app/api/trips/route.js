import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
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
export const GET = async request => {
    
    try {
        
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        })
        
        if (!token || !token.sub)
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        
        const userId = parseInt(String(token.sub), 10)
        
        if (Number.isNaN(userId))
            return NextResponse.json({ success: false, error: 'Invalid user ID' }, { status: 400 })
        
        const { searchParams } = new URL(request.url)
        const withCounts = searchParams.get('withCounts') === 'true'
        
        const trips = withCounts
            ? await tripsRepo.findAllByUserIdWithSegmentCount(userId)
            : await tripsRepo.findAllByUserId(userId)
        
        return NextResponse.json({
            success: true,
            data: trips,
            count: trips.length,
        })
        
    } catch (e) {
        
        console.error('Error getting trips:', e)
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 },
        )
        
    }
    
}

/**
 * POST /api/trips
 * Creates a new trip.
 */
export async function POST(request) {
    
    try {
        
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        })
        
        if (!token || !token.sub)
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        
        const userId = parseInt(String(token.sub), 10)
        
        if (Number.isNaN(userId))
            return NextResponse.json({ success: false, error: 'Invalid user ID' }, { status: 400 })
        
        const tripData = await request.json()
        
        const newTripPayload = {
            userId,
            name: tripData.name || 'Untitled Trip',
            description: tripData.description || '',
            startDate: tripData.startDate || null,
            endDate: tripData.endDate || null,
            coverImageUrl: tripData.coverImageUrl || null,
        }
        
        const newTrip = await db.transaction(async tx => {
            
            const trip = await tripsRepo.tx(tx).create(newTripPayload)
            
            await tx.insert(schemas.userTrips).values({
                userId,
                tripId: trip.id,
            })
            
            const plan = await plansRepo.tx(tx).create({
                tripId: trip.id,
                name: dayjs().format('MMMM YYYY'),
                description: '',
            })
            
            await segmentsRepo.tx(tx).create({
                tripId: trip.id,
                planId: plan.id,
                name: 'First Stop',
                description: '',
                // order: 1,
                startDate: dayjs().format('YYYY-MM-DD'),
                endDate: dayjs().add('5', 'day').format('YYYY-MM-DD'),
                color: 'bg-blue-500',
            })
            
            return trip
            
        })
        
        return NextResponse.json(
            {
                success: true,
                data: newTrip,
                message: 'Trip created successfully',
            },
            { status: 201 })
        
    } catch (e) {
        
        console.error('Error creating trip:', e)
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 })
        
    }
    
}
