import { NextResponse } from 'next/server'
import {
    getAllTrips,
    createTrip as createTripQuery,
    getTripsWithSegmentCount,
} from '@/lib/api/tripQueries.js'

/**
 * GET /api/trips
 * Returns the list of trips in JSON format.
 */
export async function GET(request) {
    
    try {
        
        const { searchParams } = new URL(request.url)
        const withCounts = searchParams.get('withCounts') === 'true'
        
        let trips
        
        if (withCounts) {
            trips = await getTripsWithSegmentCount()
        } else {
            trips = await getAllTrips()
        }
        
        return NextResponse.json({
            success: true,
            data: trips,
            count: trips.length,
        })
    } catch (error) {
        console.error('Error getting trips:', error)
        return NextResponse.json(
            { success: false, error: error.message },
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
        const tripData = await request.json()
        
        const newTrip = await createTripQuery({
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
    } catch (error) {
        console.error('Error creating trip:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        )
    }
}
