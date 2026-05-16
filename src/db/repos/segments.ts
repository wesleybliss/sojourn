import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema'
import { eq, asc } from 'drizzle-orm'
import database from '@/db'
import { Segment, SegmentInsert, SegmentSelect } from '@/types/database'
import { ID } from '@/types/data'

export interface ISegmentsRepository extends Repository<Segment, typeof schemas.segments> {
    findAllByTripId(tripId: ID): Promise<SegmentSelect[]>
    findAllByPlanId(planId: ID): Promise<SegmentSelect[]>
}

export class SegmentsRepository extends Repository<Segment, typeof schemas.segments> implements ISegmentsRepository {
    
    constructor(db?: typeof database) {
        
        super('segment', 'segments', schemas.segments, db)
        
    }
    
    tx(transaction: typeof database) {
        
        return new SegmentsRepository(transaction)
        
    }
    
    async create(data: SegmentInsert): Promise<SegmentSelect> {
        
        return super.create({
            tripId: data.tripId,
            planId: data.planId,
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            coordsLat: data.coordsLat,
            coordsLng: data.coordsLng,
            color: data.color,
            flightBooked: data.flightBooked,
            stayBooked: data.stayBooked,
            isShengenRegion: data.isShengenRegion,
        })
        
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
    
    async updateById(id: ID, data: Partial<SegmentInsert>) {
        
        return await super.updateById(id, {
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            coordsLat: data.coordsLat,
            coordsLng: data.coordsLng,
            color: data.color,
            flightBooked: data.flightBooked,
            stayBooked: data.stayBooked,
            isShengenRegion: data.isShengenRegion,
        })
        
    }
    
}

export default new SegmentsRepository()
