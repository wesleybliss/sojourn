import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import type { Database, Place } from '@shared/types/database.types'
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
