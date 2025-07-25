import db from '@/db'
import Repository from '@/db/repository'

export class PlansRepository extends Repository {
    
    constructor() {
        
        super(db.plans)
        
    }
    
    async findByTripId(tripId) {
        
        return await this.getBy('tripId', tripId)
        
    }
    
}

export default new PlansRepository()
