import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import tripsRepo from '@/db/repos/trips'
import plansRepo from '@/db/repos/plans'
import segmentsRepo from '@/db/repos/segments'
import placesRepo from '@/db/repos/places'

// Auth options for getServerSession
const authOptions = {
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET
}

/**
 * POST /api/sync
 * Fetches all user data for syncing to local database
 */
export async function POST(request) {
    try {
        // TODO: Re-enable auth after fixing session issues
        // For now, hardcode userId for testing
        const userId = 1 // Temporary: replace with session.user.id
        
        console.info(`[Sync] Fetching data for user ${userId} (auth temporarily disabled)`)
        
        /* Verify authentication
        const session = await getServerSession(authOptions)
        
        if (!session || !session.user) {
            console.error('[Sync] No session found')
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }
        
        const userId = session.user.id
        console.info(`[Sync] Fetching data for user ${userId}`)
        */
        
        // Fetch all user's trips first
        let trips = []
        try {
            trips = await tripsRepo.findAllByUserId(userId)
            console.info(`[Sync] Found ${trips.length} trips`)
        } catch (error) {
            console.error('[Sync] Error fetching trips:', error)
            throw error
        }
        
        // Get all trip IDs
        const tripIds = trips.map(t => t.id)
        
        // Fetch plans and segments for all user's trips
        let plans = []
        let segments = []
        let places = []
        
        try {
            const plansPromises = tripIds.length > 0 
                ? tripIds.map(tripId => plansRepo.findAllByTripId(tripId))
                : []
            const segmentsPromises = tripIds.length > 0
                ? tripIds.map(tripId => segmentsRepo.findAllByTripId(tripId))
                : []
            
            const [plansArrays, segmentsArrays, placesResult] = await Promise.all([
                Promise.all(plansPromises),
                Promise.all(segmentsPromises),
                placesRepo.findAll()
            ])
            
            // Flatten arrays
            plans = plansArrays.flat()
            segments = segmentsArrays.flat()
            places = placesResult
            
            console.info(`[Sync] Found ${plans.length} plans, ${segments.length} segments, ${places.length} places`)
        } catch (error) {
            console.error('[Sync] Error fetching related data:', error)
            throw error
        }
        
        console.info(`[Sync] Returning ${trips.length} trips, ${plans.length} plans, ${segments.length} segments, ${places.length} places`)
        
        return NextResponse.json({
            success: true,
            data: {
                trips,
                plans,
                segments,
                places
            }
        })
        
    } catch (error) {
        console.error('[Sync] Error:', error)
        return NextResponse.json(
            { 
                success: false, 
                error: error.message || 'Sync failed'
            },
            { status: 500 }
        )
    }
}
