import { NextResponse } from 'next/server'
import tripsRepo from '@/db/repos/trips'
import segmentsRepo from '@/db/repos/segments'
import db from '@/db/index.js'
import * as schemas from '@/db/schema.js'
import { eq } from 'drizzle-orm'

/**
 * POST /api/migrate
 * Migrates trips to plans - creates default plans for trips without them.
 */
export async function POST() {
    try {
        const trips = await tripsRepo.findAll()
        const migrationResults = []
        
        for (const trip of trips) {
            console.log('Migrating trip:', trip.name)
            const segments = await segmentsRepo.findAllByTripId(trip.id)
            
            let planId = null
            let migratedSegments = 0
            
            for (const segment of segments) {
                if (segment.planId) {
                    continue
                }
                
                if (!planId) {
                    console.log('Creating plan for trip:', trip.name)
                    const [newPlan] = await db
                        .insert(schemas.plans)
                        .values({
                            tripId: trip.id,
                            name: 'Plan #1',
                        })
                        .returning()
                    
                    planId = newPlan.id
                }
                
                console.log('Updating segment with plan ID:', planId)
                await db
                    .update(schemas.segments)
                    .set({ planId })
                    .where(eq(schemas.segments.id, segment.id))
                
                migratedSegments++
            }
            
            migrationResults.push({
                tripId: trip.id,
                tripName: trip.name,
                planId,
                migratedSegments,
            })
        }
        
        return NextResponse.json({
            success: true,
            data: migrationResults,
            message: `Migration completed. ${migrationResults.length} trips processed.`,
        })
    } catch (e) {
        console.error('Error during migration:', e)
        return NextResponse.json(
            { success: false, error: (e as Error).message },
            { status: 500 },
        )
    }
}
