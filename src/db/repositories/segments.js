import db from '@/db'
import Repository from '@/db/repository'

export class SegmentsRepository extends Repository {
    
    constructor(tripId) {
        
        super(db.segments)
        
        this.tripId = tripId
        
    }
    
    async create(data) {
        
        return await super.create({
            ...data,
            tripId: this.tripId,
        })
        
    }
    
}

export default SegmentsRepository
