import { desc,eq } from 'drizzle-orm'

import { APlansRepository } from '@/db/repos/plans'
import Repository from '@/db/repos/repo'
import { ASegmentsRepository } from '@/db/repos/segments'
import * as schemas from '@/db/schema'
import { TripWithSegmentCount } from '@/types'
import { ID } from '@/types/data'
import { Database, Trip, TripInsert, TripSelect } from '@/types/database'

export abstract class ATripsRepository extends Repository<Trip, typeof schemas.trips> {
    abstract findAllByUserId(_userId: ID): Promise<TripSelect[]>
    abstract findOneByName(_name: string, _withDetails?: boolean, _plansRepo?: APlansRepository): Promise<Trip | null>
    abstract findAllByUserIdWithSegmentCount(
        _userId: ID,
        _segmentsRepo: ASegmentsRepository,
    ): Promise<TripWithSegmentCount[] | null>
    
    abstract findOneWithDetails(_id: ID, _plansRepo: APlansRepository): Promise<Trip | null>
}

export class TripsRepository extends ATripsRepository {
    
    constructor(db?: Database) {
        
        super('trip', 'trips', schemas.trips, db)
        
    }
    
    tx(transaction: Database) {
        
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
    
    async findOneByName(name: string, withDetails?: boolean, plansRepo?: APlansRepository): Promise<Trip | null> {
        
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
    
    async findAllByUserIdWithSegmentCount(
        userId: ID,
        segmentsRepo: ASegmentsRepository,
    ): Promise<TripWithSegmentCount[] | null> {
        
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
    
    async findOneWithDetails(id: ID, plansRepo: APlansRepository): Promise<Trip | null> {
        
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
    
    async updateById<K extends TripInsert>(
        id: ID,
        data: Partial<K>,
    ): Promise<TripSelect> {
        
        return await super.updateById(id, {
            name: data.name,
            description: data.description,
            coverImageUrl: data.coverImageUrl,
        })
        
    }
    
}

export default new TripsRepository()
