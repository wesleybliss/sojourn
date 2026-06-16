import PlansRepository from '@repo/shared/db/repos/plans'
import Repository from '@repo/shared/db/repos/repo'
import SegmentsRepository from '@repo/shared/db/repos/segments'
import * as schemas from '@repo/shared/db/schema'
import type { TripWithSegmentCount } from '@repo/shared/types'
import type { ID } from '@shared/types/data.types'
import type { Database, Trip, TripSelect } from '@shared/types/database.types'
import { and, desc, eq } from 'drizzle-orm'

export class TripsRepository extends Repository<Trip, typeof schemas.trips> {
    
    constructor(db?: Database) {
        
        super('trip', 'trips', schemas.trips, db)
        
    }
    
    tx(transaction: Database): TripsRepository {
        
        return new TripsRepository(transaction)
        
    }
    
    async findAllByUserId(userId: ID, teamId: ID): Promise<TripSelect[]> {
        
        try {
            
            const trips = await this.db
                .select({ trip: this.schema })
                .from(this.schema)
                .innerJoin(
                    schemas.userTrips,
                    eq(schemas.userTrips.tripId, this.schema.id),
                )
                .where(and(
                    eq(schemas.userTrips.userId, userId),
                    eq(schemas.trips.teamId, teamId),
                ))
                .orderBy(desc(this.schema.id))
            
            return trips.map(result => ({
                ...result.trip,
                updatedAt: result.trip.updatedAt as Date,
                createdAt: result.trip.createdAt as Date,
            })) as TripSelect[]
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} for user ${userId}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async findAllByUserIdWithDetails(
        userId: ID,
        teamId: ID,
        plansRepo: typeof PlansRepository,
    ): Promise<Trip[]> {
        
        try {
            
            const trips = await this.findAllByUserId(userId, teamId)
            
            return await Promise.all(trips.map(async trip => ({
                ...trip,
                plans: await plansRepo.findAllByTripId(trip.id),
            })))
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} with details for user ${userId}:`, e)
            throw new Error(`Failed to fetch ${this.plural} with details`)
            
        }
        
    }
    
    async findOneByName(name: string, plansRepo: typeof PlansRepository, withDetails?: boolean): Promise<Trip | null> {
        
        try {
            
            const trip = await this.findOneBy('name', name)
            
            if (!trip) return null
            if (!withDetails) return trip
            
            const plans = await plansRepo.findAllByTripId(trip.id)
            
            return {
                ...trip,
                plans,
            }
            
        } catch (e) {
            
            console.error(`Error fetching ${this.name} for name ${name}:`, e)
            throw new Error(`Failed to fetch ${this.name}`)
            
        }
        
    }
    
    async findAllByUserIdWithSegmentCount(
        userId: ID,
        teamId: ID,
        segmentsRepo = SegmentsRepository,
    ): Promise<TripWithSegmentCount[] | null> {
        
        try {
            
            const trips = await this.findAllByUserId(userId, teamId)
            
            return await Promise.all(trips.map(async trip => {
                
                const segments = await segmentsRepo.findAllByTripId(trip.id)
                
                return {
                    ...trip,
                    segmentCount: segments.length,
                }
                
            }))
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} with segment counts for user ${userId}:`, e)
            throw new Error(`Failed to fetch ${this.plural} with segment counts`)
            
        }
        
    }
    
    async findAllByUserIdWithDetailsAndSegmentCount(
        userId: ID,
        teamId: ID,
        plansRepo: typeof PlansRepository,
    ): Promise<TripWithSegmentCount[]> {
        
        const trips = await this.findAllByUserIdWithDetails(userId, teamId, plansRepo)
        
        return trips.map(trip => ({
            ...trip,
            segmentCount: trip.plans?.reduce((total, plan) => total + (plan.segments?.length || 0), 0) || 0,
        }))
        
    }
    
    async findOneWithDetails(id: ID, plansRepo: typeof PlansRepository): Promise<Trip | null> {
        
        try {
            
            const trip = await this.findOneById(id)
            
            if (!trip) return null
            
            const plans = await plansRepo.findAllByTripId(id)
            
            return {
                ...trip,
                plans,
            }
            
        } catch (e) {
            
            console.error(`Error fetching ${this.name} details for ${id}:`, e)
            throw new Error(`Failed to fetch ${this.name} details`)
            
        }
        
    }
    
}

export default new TripsRepository()
