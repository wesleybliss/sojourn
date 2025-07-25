import tripsRepo from '@/db/repositories/trips'
import plansRepo from '@/db/repositories/plans'
import segmentsRepo from '@/db/repositories/segments'

const DebugViewModel = () => {
    
    const migrateTripsToPlans = async () => {
        
        const trips = await tripsRepo.getAll()
        
        for (const trip of trips) {
            
            console.log('Migrating trip:', trip.name)
            const segments = await segmentsRepo.findByTripId(trip.id)
            
            let planId = null
            
            for (const segment of segments) {
                
                /* if (segment.planId) {
                    await segmentsRepo.update(segment.id, {
                        planId: null,
                    })
                    continue
                } */
                
                if (segment.planId)
                    continue
                
                if (!planId) {
                    console.log('Creating plan')
                    planId = await plansRepo.create({
                        tripId: trip.id,
                        name: 'Plan #1',
                    })
                }
                
                console.log('Updating segment with plan ID:', planId)
                await segmentsRepo.update(segment.id, {
                    planId: planId,
                })
                
            }
            
        }
        
        // await plansRepo.clear()
        
    }
    
    return {
        migrateTripsToPlans,
    }
    
}

export default DebugViewModel
