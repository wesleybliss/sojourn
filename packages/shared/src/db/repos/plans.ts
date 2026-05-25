import { asc,eq } from 'drizzle-orm'

import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema'
import { ID } from '@/types/data'
import { Database, Plan, PlanInsert, PlanSelect } from '@/types/database'

export abstract class APlansRepository extends Repository<Plan, typeof schemas.plans> {
    abstract findAllByTripId(_tripId: ID): Promise<PlanSelect[]>
}

export class PlansRepository extends APlansRepository {
    
    constructor(db?: Database) {
        
        super('plan', 'plans', schemas.plans, db)
        
    }
    
    tx(transaction: Database) {
        
        return new PlansRepository(transaction)
        
    }
    
    async create(data: PlanInsert): Promise<PlanSelect> {
        
        return super.create({
            name: data.name,
            description: data.description,
            tripId: data.tripId,
        })
        
    }
    
    async findAllByTripId(_tripId: ID): Promise<PlanSelect[]> {
        
        try {
            
            const plansWithSegments = await this.db
                .select({
                    plan: schemas.plans,
                    segment: schemas.segments,
                })
                .from(schemas.plans)
                .leftJoin(schemas.segments, eq(schemas.segments.planId, schemas.plans.id))
                .where(eq(schemas.plans.tripId, _tripId))
                .orderBy(asc(schemas.plans.id), asc(schemas.segments.startDate))
            
            // Group segments by plan
            const plansMap = new Map<ID, Plan>()
            
            plansWithSegments.forEach(({ plan, segment }) => {
                
                if (!plansMap.has(plan.id))
                    plansMap.set(plan.id, {
                        ...plan,
                        segments: [],
                    })
                
                if (segment)
                    plansMap.get(plan.id)?.segments?.push({
                        ...segment,
                        startDate: this.normalizeDateValue(segment.startDate),
                        endDate: this.normalizeDateValue(segment.endDate),
                    })
                
            })
            
            return Array.from(plansMap.values())
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} for trip ${_tripId}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
    async updateById<K extends PlanInsert>(
        id: ID,
        data: Partial<K>,
    ): Promise<PlanSelect> {
        
        return super.updateById(id, data)
        
    }
    
}

export default new PlansRepository()
