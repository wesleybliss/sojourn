import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import {
    getTripsByUserId,
    getTripsWithSegmentCountByUserId,
    createTrip as createTripQuery,
} from '@/db/repos/trips.js'

/**
 * GET /api/trips
 * Returns the list of trips in JSON format.
 */
export async function GET(request) {
    
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
            ? await getTripsWithSegmentCountByUserId(userId)
            : await getTripsByUserId(userId)
        
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
        
        const newTrip = await createTripQuery({
            userId,
            name: tripData.name || 'Untitled Trip',
            description: tripData.description || '',
            startDate: tripData.startDate || null,
            endDate: tripData.endDate || null,
            coverImageUrl: tripData.coverImageUrl || null,
        })
        
        return NextResponse.json(
            {
                success: true,
                data: newTrip,
                message: 'Trip created successfully',
            },
            { status: 201 },
        )
        
    } catch (e) {
        
        console.error('Error creating trip:', e)
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 },
        )
        
    }
    
}
