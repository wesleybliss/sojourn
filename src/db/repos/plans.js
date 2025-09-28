import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema.js'
import { eq, asc } from 'drizzle-orm'

export class PlansRepository extends Repository  {
    
    constructor() {
        
        super('plan', 'plans', schemas.plans)
        
    }
    
    tx(transaction) {
        
        return new PlansRepository(this.name, this.plural, this.schema, transaction)
        
    }
    
    async create(data) {
        
        return super.create({
            name: data.name,
            description: data.description,
            tripId: data.tripId,
        })
        
    }
    
    async findAllByTripId(tripId) {
        
        try {
            
            const plansWithSegments = await this.db
                .select({
                    plan: schemas.plans,
                    segment: schemas.segments,
                })
                .from(schemas.plans)
                .leftJoin(schemas.segments, eq(schemas.segments.planId, schemas.plans.id))
                .where(eq(schemas.plans.tripId, tripId))
                .orderBy(asc(schemas.plans.id), asc(schemas.segments.startDate))
            
            // Group segments by plan
            const plansMap = new Map()
            
            plansWithSegments.forEach(({ plan, segment }) => {
                
                if (!plansMap.has(plan.id))
                    plansMap.set(plan.id, {
                        ...plan,
                        segments: [],
                    })
                
                if (segment)
                    plansMap.get(plan.id).segments.push({
                        ...segment,
                        startDate: this.normalizeDateValue(segment.startDate),
                        endDate: this.normalizeDateValue(segment.endDate),
                    })
                
            })
            
            return Array.from(plansMap.values())
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} for trip ${tripId}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async updateById(id, data) {
        
        return super.updateById(id, {
            name: data.name,
            description: data.description,
        })
        
    }
    
}

export default new PlansRepository()
