import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema'
import { Database, Place } from '@/types/database'
// import { eq, asc } from 'drizzle-orm'

export abstract class APlacesRepository extends Repository<Place, typeof schemas.places> {}

export class PlacesRepository extends APlacesRepository {
    
    constructor(db?: Database) {
        
        super('place', 'places', schemas.places, db)
        
    }
    
    tx(transaction: Database) {
        
        return new PlacesRepository(transaction)
        
    }
    
}

export default new PlacesRepository()
