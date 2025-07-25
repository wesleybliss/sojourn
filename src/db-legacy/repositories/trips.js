import db from '@/db'
import Repository from '@/db/repository'

export class TripsRepository extends Repository {
    
    constructor() {
        
        super(db.trips)
        
    }
    
    async getByName(name, ignoreCase = false) {
        
        const res = await this.getBy('name', name, ignoreCase)
        
        return res?.[0]
        
    }
    
}

export default new TripsRepository()
