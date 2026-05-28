import db from '@repo/shared/db/index'
import segmentsRepo from '@repo/shared/db/repos/segments'
import tripsRepo from '@repo/shared/db/repos/trips'
import * as schemas from '@repo/shared/db/schema'
import { apiResponse } from '@repo/shared/utils/api'
import { eq } from 'drizzle-orm'

const handler = async (request: Request, context: { auth: any, params: Promise<any> }) => {
  if (request.method === 'POST') {
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
      
      return apiResponse.ok({
        data: migrationResults,
        message: `Migration completed. ${migrationResults.length} trips processed.`,
      })
    } catch (e) {
      console.error('Error during migration:', e)
      return apiResponse.internalServerError()
    }
  } else {
    return new Response(
      JSON.stringify({ success: false, error: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export default handler