import db from '@/db'
import Repository from '@/db/repository'
import { geocode } from '@/lib/utils'
import dayjs from 'dayjs'

export class SegmentsRepository extends Repository {
    
    constructor() {
        
        super(db.segments)
        
    }
    
    async create(data) {
        
        if (!data.tripId)
            throw new Error('Property "tripId" is required')
        
        if (!data.planId)
            throw new Error('Property "planId" is required')
        
        if (!data.coords)
            data.coords = await geocode(data.name)
        
        return await super.create({
            flightBooked: false,
            stayBooked: false,
            ...data,
        })
        
    }
    
    async createWithNextDate(data) {
        
        if (!data.tripId)
            throw new Error('Property "tripId" is required')
        
        if (!data.planId)
            throw new Error('Property "planId" is required')
        
        const segments = await this.table
            .where('planId')
            .equals(data.planId)
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
    
    async findByTripId(tripId) {
        
        return await this.getBy('tripId', tripId)
        
    }
    
    async findByPlanId(planId) {
        
        return await this.getBy('planId', planId)
        
    }
    
}

export default new SegmentsRepository()
