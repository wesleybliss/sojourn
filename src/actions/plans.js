import { schemas } from '@/db'
import plansRepo from '@/db/repositories/plans'
import segmentsRepo from '@/db/repositories/segments'
import { cloneRecord } from '@/db/dbUtils'

export const createPlan = async () => {
    
    console.log('createPlan: @todo')
    
}

export const clonePlan = async planId => {
    
    // const dbg = (await plansRepo.getAll()).filter(it => !it.tripId)
    // return console.log(dbg)
    //return await Promise.all(dbg.map(it => plansRepo.delete(it.id)))
    // return console.log(dbg)
    
    const plan = await plansRepo.getById(planId)
    
    if (!plan || !plan.tripId)
        throw new Error('Plan not found')
    
    const count = await plansRepo.count()
    const name = `Plan #${count + 1}`
    const segments = await segmentsRepo.findByPlanId(planId)
    
    const newPlanId = await plansRepo.create({
        ...cloneRecord(plan, schemas.plans),
        name,
        tripId: plan.tripId,
    })
    
    const segmentsPayloads = segments.map(it => ({
        ...cloneRecord(it, schemas.segments),
        tripId: plan.tripId,
        planId: newPlanId,
    }))
    
    const newSegments = await Promise.all(segmentsPayloads.map(it => {
        return segmentsRepo.create(it)
    }))
    
    console.log('clonePlan:', name, newPlanId, newSegments)
    
}

export const deletePlan = async planId => {
    
    const plan = await plansRepo.getById(planId)
    
    if (!plan)
        throw new Error('Plan not found')
    
    const segments = await segmentsRepo.findByPlanId(plan.id)
    
    await Promise.all(segments.map(it => segmentsRepo.delete(it.id)))
    await plansRepo.delete(planId)
    
    console.log('deletePlan: deleted plan and', segments.length, 'segments')
    
}
