import Repository from '@/db/repos/repo'
import * as schemas from '@/db/schema.js'
// import { eq, asc } from 'drizzle-orm'

export class PlacesRepository extends Repository  {
    
    constructor() {
        
        super('place', 'places', schemas.places)
        
    }
    
    tx(transaction) {
        
        return new PlacesRepository(this.name, this.plural, this.schema, transaction)
        
    }
    
}

export default new PlacesRepository()
