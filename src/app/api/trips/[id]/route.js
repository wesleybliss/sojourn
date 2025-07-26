import { NextResponse } from 'next/server'
import {
    getTripById,
    getTripWithDetails,
    updateTrip as updateTripQuery,
    deleteTrip as deleteTripQuery,
} from '@/db/repos/trips.js'

/**
 * GET /api/trips/[id]
 * Returns a single trip by ID.
 */
export async function GET(request, { params }) {
    try {
        const { searchParams } = new URL(request.url)
        const withDetails = searchParams.get('withDetails') === 'true'
        const id = parseInt(params.id, 10)
        
        let trip
        
        if (withDetails) {
            trip = await getTripWithDetails(id)
        } else {
            trip = await getTripById(id)
        }
        
        if (!trip) {
            return NextResponse.json(
                { success: false, error: 'Trip not found' },
                { status: 404 },
            )
        }
        
        return NextResponse.json({
            success: true,
            data: trip,
        })
    } catch (error) {
        console.error(`Error getting trip ${params.id}:`, error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        )
    }
}

/**
 * PUT /api/trips/[id]
 * Updates a trip by ID.
 */
export async function PUT(request, { params }) {
    try {
        const tripData = await request.json()
        const id = parseInt(params.id, 10)
        
        const updatedTrip = await updateTripQuery(id, tripData)
        
        if (!updatedTrip) {
            return NextResponse.json(
                { success: false, error: 'Trip not found' },
                { status: 404 },
            )
        }
        
        return NextResponse.json({
            success: true,
            data: updatedTrip,
            message: 'Trip updated successfully',
        })
    } catch (error) {
        console.error(`Error updating trip ${params.id}:`, error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        )
    }
}

/**
 * DELETE /api/trips/[id]
 * Deletes a trip by ID.
 */
export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id, 10)
        
        await deleteTripQuery(id)
        
        return NextResponse.json({
            success: true,
            message: 'Trip deleted successfully',
        })
    } catch (error) {
        console.error(`Error deleting trip ${params.id}:`, error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        )
    }
}
