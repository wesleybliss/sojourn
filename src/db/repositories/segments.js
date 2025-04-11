import db from '@/db'
import Repository from '@/db/repository'
import dayjs from 'dayjs'

export class SegmentsRepository extends Repository {
    
    constructor() {
        
        super(db.segments)
        
    }
    
    async create(data) {
        
        if (!data.tripId)
            throw new Error('Property "tripId" is required')
        
        return await super.create(data)
        
    }
    
    async createWithNextDate(data) {
        
        if (!data.tripId)
            throw new Error('Property "tripId" is required')
        
        const segments = await this.table
            .where('tripId')
            .equals(data.tripId)
            // .reverse()
            .sortBy('startDate')
        
        const nextStartDate = dayjs(segments
            .map(it => it.endDate)
            .sort((a, b) => a - b)
            .reverse()
            ?.[0] || Date.now())
        
        return await this.create({
            ...data,
            startDate: nextStartDate.toDate(),
            endDate: nextStartDate.add(1, 'week').toDate(),
        })
        
    }
    
}

export default new SegmentsRepository()
