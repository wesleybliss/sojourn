import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import { ID, type Transaction } from '@shared/types'
import type { Database, Team, TeamSelect } from '@shared/types/database.types'
import { desc, eq } from 'drizzle-orm'

export class TeamsRepository extends Repository<Team, typeof schemas.teams> {
    
    constructor(db?: Database | Transaction) {
        
        super('team', 'teams', schemas.teams, db)
        
    }
    
    tx(transaction: Transaction): TeamsRepository {
        
        return new TeamsRepository(transaction)
        
    }
    
    async findAllByUserId(userId: ID): Promise<TeamSelect[]> {
        
        try {
            
            const teams = await this.db
                .select({ team: this.schema })
                .from(this.schema)
                .innerJoin(
                    schemas.userTeams,
                    eq(schemas.userTeams.teamId, this.schema.id),
                )
                .where(eq(schemas.userTeams.userId, userId))
                .orderBy(desc(this.schema.id))
            
            return teams.map(result => ({
                ...result.team,
                updatedAt: result.team.updatedAt as Date,
                createdAt: result.team.createdAt as Date,
            })) as TeamSelect[]
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} for user ${userId}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
}

export default new TeamsRepository()
