import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import type { Database, Team } from '@shared/types/database.types'

export class TeamsRepository extends Repository<Team, typeof schemas.teams> {
    
    constructor(db?: Database) {
        
        super('team', 'teams', schemas.teams, db)
        
    }
    
    tx(transaction: Database): TeamsRepository {
        
        return new TeamsRepository(transaction)
        
    }
    
}

export default new TeamsRepository()
