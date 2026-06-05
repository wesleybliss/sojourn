import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import type { Database, Trip } from '@shared/types/database.types'

export class UserTripsRepository extends Repository<Trip, typeof schemas.userTrips> {
    
    constructor(db?: Database) {
        
        super('userTrip', 'userTrips', schemas.userTrips, db)
        
    }
    
    tx(transaction: Database): UserTripsRepository {
        
        return new UserTripsRepository(transaction)
        
    }
    
}

export default new UserTripsRepository()
