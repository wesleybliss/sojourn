import { 
    getAllTrips, 
    getSegmentsByTripId, 
    updateSegment,
} from '@/lib/api/tripQueries'
import db from '@/db2/index.js'
import * as schemas from '@/db2/schema.js'

const DebugViewModel = () => {
    
    const migrateTripsToPlans = async () => {
        
        const trips = await getAllTrips()
        
        for (const trip of trips) {
            
            console.log('Migrating trip:', trip.name)
            const segments = await getSegmentsByTripId(trip.id)
            
            let planId = null
            
            for (const segment of segments) {
                
                /* if (segment.planId) {
                    await updateSegment(segment.id, {
                        planId: null,
                    })
                    continue
                } */
                
                if (segment.planId)
                    continue
                
                if (!planId) {
                    console.log('Creating plan')
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
                await updateSegment(segment.id, {
                    planId: planId,
                })
                
            }
            
        }
        
        // Note: No direct clear function available in tripQueries
        // Would need to implement deleteAllPlans if needed
    }
    
    return {
        migrateTripsToPlans,
    }
    
}

export default DebugViewModel
