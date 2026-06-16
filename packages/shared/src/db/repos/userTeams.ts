import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import { ID } from '@shared/types/data.types'
import type { Database, Transaction, UserTeam } from '@shared/types/database.types'
import { eq } from 'drizzle-orm'

export class UserTeamsRepository extends Repository<UserTeam, typeof schemas.userTeams> {
    
    constructor(db?: Database | Transaction) {
        
        super('userTeam', 'userTeams', schemas.userTeams, db)
        
    }
    
    tx(transaction: Transaction): UserTeamsRepository {
        
        return new UserTeamsRepository(transaction)
        
    }
    
    async findAllByUserId(userId: ID) {
        
        const userTeam = await this.select()
            .where(eq(this.schema.userId, userId))
            .leftJoin(schemas.teams, eq(schemas.teams.id, schemas.userTeams.teamId))
        
        return userTeam
        
    }
    
}

export default new UserTeamsRepository()
