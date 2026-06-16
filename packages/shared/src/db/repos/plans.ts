import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import type { ID } from '@shared/types/data.types'
import type { Database, Plan, PlanSelect, Transaction } from '@shared/types/database.types'
import { asc,eq } from 'drizzle-orm'

export class PlansRepository extends Repository<Plan, typeof schemas.plans> {
    
    constructor(db?: Database | Transaction) {
        
        super('plan', 'plans', schemas.plans, db)
        
    }
    
    tx(transaction: Transaction): PlansRepository {
        
        return new PlansRepository(transaction)
        
    }
    
    async findAllByTripId(tripId: ID): Promise<PlanSelect[]> {
        
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
            const plansMap = new Map<ID, Plan>()
            
            plansWithSegments.forEach(({ plan, segment }) => {
                
                if (!plansMap.has(plan.id))
                    plansMap.set(plan.id, {
                        ...plan,
                        segments: [],
                        updatedAt: plan.updatedAt as Date,
                        createdAt: plan.createdAt as Date,
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
            
            console.error(`Error fetching ${this.plural} for trip ${tripId}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
}

export default new PlansRepository()
