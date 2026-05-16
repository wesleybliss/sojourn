import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema.js'
import database from '@/db'
// import { eq, asc } from 'drizzle-orm'

export interface IPlacesRepository extends Repository<typeof schemas.places> {}

export class PlacesRepository extends Repository<typeof schemas.places> {
    
    constructor(db?: typeof database) {
        
        super('place', 'places', schemas.places, db)
        
    }
    
    tx(transaction: typeof database) {
        
        return new PlacesRepository(transaction)
        
    }
    
}

export default new PlacesRepository()
