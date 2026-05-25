import database from '@/db'
import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema'
import { Place } from '@/types/database'
// import { eq, asc } from 'drizzle-orm'

export interface IPlacesRepository extends Repository<Place, typeof schemas.places> {}

export class PlacesRepository extends Repository<Place, typeof schemas.places> {
    
    constructor(db?: typeof database) {
        
        super('place', 'places', schemas.places, db)
        
    }
    
    tx(transaction: typeof database) {
        
        return new PlacesRepository(transaction)
        
    }
    
}

export default new PlacesRepository()
