import { asc,eq } from 'drizzle-orm'

import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema'
import { ID } from '@/types/data'
import { Database, Segment, SegmentInsert, SegmentSelect } from '@/types/database'

export class SegmentsRepository extends Repository<Segment, typeof schemas.segments> {
    
    constructor(db?: Database) {
        
        super('segment', 'segments', schemas.segments, db)
        
    }
    
    tx(transaction: Database): SegmentsRepository {
        
        return new SegmentsRepository(transaction)
        
    }
    
    async createWithNextDate(data: Partial<SegmentInsert>): Promise<SegmentSelect> {
        
        if (!data.tripId)
            throw new Error('createWithNextDate: tripId required')
        
        const segments = await this.findAllByTripId(data.tripId)
        
        console.log('@@@@ testing', segments)
        
        throw new Error('Not yet implemented')
        
    }
    
    async findAllByTripId(tripId: ID) {
        
        try {
            
            const segments = await this.db
                .select()
                .from(schemas.segments)
                .where(eq(schemas.segments.tripId, tripId))
                .orderBy(asc(schemas.segments.startDate))
            
            return segments.map(s => ({
                ...s,
                startDate: this.normalizeDateValue(s.startDate),
                endDate: this.normalizeDateValue(s.endDate),
            }))
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} for trip ${tripId}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async findAllByPlanId(planId: ID) {
        
        try {
            
            const segments = await this.db
                .select()
                .from(this.schema)
                .where(eq(this.schema.planId, planId))
                .orderBy(asc(this.schema.startDate))
            
            return segments.map(s => ({
                ...s,
                startDate: this.normalizeDateValue(s.startDate),
                endDate: this.normalizeDateValue(s.endDate),
            }))
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} for plan ${planId}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
}

export default new SegmentsRepository()
