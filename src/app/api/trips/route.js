import { NextResponse } from 'next/server'
import { getTrips as fetchTrips } from '@/lib/api/serverFunctions'

/**
 * GET /api/trips
 * Returns the list of trips in JSON format.
 */
export async function GET() {
    const result = await fetchTrips()
    if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 })
    }
    return NextResponse.json(result.data)
}
