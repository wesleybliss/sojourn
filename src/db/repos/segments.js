import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema'
import { eq, asc } from 'drizzle-orm'

export class SegmentsRepository extends Repository  {
    
    constructor() {
        
        super('segment', 'segments', schemas.segments)
        
    }
    
    async create(data) {
        
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
    
    async findAllByTripId(tripId) {
        
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
    
    async findAllByPlanId(planId) {
        
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
    
    async updateById(id, data) {
        
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
