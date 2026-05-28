import Repository from '@shared/db/repos/repo'
import * as schemas from '@shared/db/schema'
import { Database, Trip } from '@shared/types/database'

export class UserTripsRepository extends Repository<Trip, typeof schemas.userTrips> {
    
    constructor(db?: Database) {
        
        super('userTrip', 'userTrips', schemas.userTrips, db)
        
    }
    
    tx(transaction: Database): UserTripsRepository {
        
        return new UserTripsRepository(transaction)
        
    }
    
}

export default new UserTripsRepository()
