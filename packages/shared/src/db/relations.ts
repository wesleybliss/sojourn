import * as schema from '@repo/shared/db/schema'
import { defineRelations } from 'drizzle-orm'

export const relations = defineRelations(schema, r => ({
    
    users: {
        
        teams: r.many.userTeams({
            from: r.users.id,
            to: r.userTeams.userId,
            alias: 'userTeams',
        }),
        
    },
    
    teams: {
        
        members: r.many.userTeams({
            from: r.teams.id,
            to: r.userTeams.teamId,
            alias: 'userTeams',
        }),
        
        trips: r.many.trips({
            from: r.teams.id,
            to: r.trips.teamId,
        }),
        
    },
    
    userTeams: {
        
        user: r.one.users({
            from: r.userTeams.userId,
            to: r.users.id,
            alias: 'userTeams',
        }),
        
        team: r.one.teams({
            from: r.userTeams.teamId,
            to: r.teams.id,
            alias: 'userTeams',
        }),
        
    },
    
    trips: {
        
        team: r.one.teams({
            from: r.trips.teamId,
            to: r.teams.id,
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
