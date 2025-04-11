import db from '@/db'
import Repository from '@/db/repository'

export class TripsRepository extends Repository {
    
    constructor() {
        
        super(db.trips)
        
    }
    
}

export default new TripsRepository()
