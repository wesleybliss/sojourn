import 'dotenv/config'

import path from 'node:path'

import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { PlanInsert } from '@repo/shared/types'
import { eq } from 'drizzle-orm'

const args = process.argv.slice(2)
const [tripId, name] = args

const script = path.basename(process.argv[0])
const usage = `USAGE: ${script} <trip-ID> <name>`

const main = async () => {
    
    if (!tripId?.length)
        throw new Error('Invalid trip trip ID')
    
    if (!name?.length)
        throw new Error('Invalid trip name')
    
    const trip = await db
        .select()
        .from(schemas.trips)
        .where(eq(schemas.trips.id, parseInt(tripId, 10)))
    
    if (!trip)
        throw new Error('Trip not found')
    
    const data: PlanInsert = {
        tripId: parseInt(tripId, 10),
        name,
    }
    
    const insertedPlans = await db
        .insert(schemas.plans)
        .values(data)
        .returning({
            id: schemas.plans.id,
            tripId: schemas.plans.tripId,
            name: schemas.plans.name,
        })
    
    const plan = insertedPlans[0]
    
    console.table(data)
    console.table(plan)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log({ args, tripId, name })
        console.log(usage)
        console.error(e)
        process.exit(1)
    })
