import { defineRelations } from 'drizzle-orm'

import * as schema from '@repo/shared/db/schema'

export const relations = defineRelations(schema, r => ({
    
    trips: {
        
        members: r.many.userTrips({
            from: r.trips.id,
            to: r.userTrips.tripId,
            alias: 'userTrips',
        }),
        
        plans: r.many.plans({
            from: r.trips.id,
            to: r.plans.tripId,
        }),
        
        segments: r.many.segments({
            from: r.trips.id,
            to: r.segments.tripId,
        }),
        
    },
    
    userTrips: {
        
        user: r.one.users({
            from: r.userTrips.userId,
            to: r.users.id,
            alias: 'userTrips',
        }),
        
        trip: r.one.trips({
            from: r.userTrips.tripId,
            to: r.trips.id,
            alias: 'userTrips',
        }),
        
    },
    
    plans: {
        
        trip: r.one.trips({
            from: r.plans.tripId,
            to: r.trips.id,
        }),
        
        segments: r.many.segments({
            from: r.plans.id,
            to: r.segments.planId,
        }),
        
    },
    
    segments: {
        
        trip: r.one.trips({
            from: r.segments.tripId,
            to: r.trips.id,
        }),
        
        plan: r.one.plans({
            from: r.segments.planId,
            to: r.plans.id,
        }),
        
    },
    
}))
