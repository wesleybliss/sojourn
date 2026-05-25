import { desc,eq } from 'drizzle-orm'

import database from '@/db'
import { IPlansRepository } from '@/db/repos/plans'
import Repository from '@/db/repos/repo'
import { ISegmentsRepository } from '@/db/repos/segments'
import * as schemas from '@/db/schema'
import { ID } from '@/types/data'
import { Trip, TripInsert, TripSelect } from '@/types/database'

export class TripsRepository extends Repository<Trip, typeof schemas.trips> {
    
    constructor(db?: typeof database) {
        
        super('trip', 'trips', schemas.trips, db)
        
    }
    
    tx(transaction: typeof database) {
        
        return new TripsRepository(transaction)
        
    }
    
    async create(
        data: TripInsert,
    ): Promise<TripSelect> {
        
        return super.create({
            userId: data.userId,
            name: data.name,
            description: data.description,
            coverImageUrl: data.coverImageUrl,
        })
        
    }
    
    async findAllByUserId(userId: ID): Promise<TripSelect[]> {
        
        try {
            
            const trips = await this.db
                .select({ trip: this.schema })
                .from(this.schema)
                .innerJoin(
                    schemas.userTrips,
                    eq(schemas.userTrips.tripId, this.schema.id),
                )
                .where(eq(schemas.userTrips.userId, userId))
                .orderBy(desc(this.schema.id))
            
            return trips.map(result => result.trip) as TripSelect[]
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} for user ${userId}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async findOneByName(name: string, withDetails?: boolean, plansRepo?: IPlansRepository): Promise<Trip | null> {
        
        if (withDetails && !plansRepo)
            throw new Error('Plans repository is required when fetching trip details')
        
        try {
            
            const trip = await this.findOneBy('name', name)
            
            if (!trip) return null
            if (!withDetails) return trip
            
            const plans = await plansRepo!.findAllByTripId(trip.id)
            
            return {
                ...trip,
                plans,
            }
            
        } catch (e) {
            
            console.error(`Error fetching ${this.name} for name ${name}:`, e)
            throw new Error(`Failed to fetch ${this.name}`)
            
        }
        
    }
    
    async findAllByUserIdWithSegmentCount(userId: ID, segmentsRepo: ISegmentsRepository) {
        
        try {
            
            const trips = await this.findAllByUserId(userId)
            
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
    
    async findOneWithDetails(id: ID, plansRepo: IPlansRepository): Promise<Trip | null> {
        
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
    
    async updateById(id: ID, data: Partial<TripInsert>) {
        
        return await super.updateById(id, {
            name: data.name,
            description: data.description,
            coverImageUrl: data.coverImageUrl,
        })
        
    }
    
}

export default new TripsRepository()
