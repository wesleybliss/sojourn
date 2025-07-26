import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import db from '@/db/index.js'
import * as schemas from '@/db/schema.js'
import { eq } from 'drizzle-orm'

const args = process.argv.slice(2)
const [tripsFile] = args

const script = path.basename(process.argv[0])
const usage = `USAGE: ${script} <tripsFile.json>`

const importSegment = async (tripId, plan, segment) => {
    
    if (!tripId?.toString()?.length)
        throw new Error(`importSegment: Invalid trip ID "${tripId}"`)
    
    if (!plan?.id?.toString()?.length) {
        console.error('importSegment: Invalid plan', plan)
        throw new Error('importSegment: Invalid plan')
    }
    
    console.log('Creating segment', plan.name, '->', segment.name)
    
    await db
        .insert(schemas.segments)
        .values({
            tripId,
            planId: plan.id,
            name: segment.name,
            description: segment.description,
            startDate: new Date(segment.startDate),
            endDate: new Date(segment.endDate),
            coordsLat: segment.coords.lat,
            coordsLng: segment.coords.lng,
            color: segment.color,
            flightBooked: segment.flightBooked || false,
            stayBooked: segment.stayBooked || false,
            isShengenRegion: segment.isShengenRegion || false,
        })
    
}

const importTrip = async data => {
    
    if (data.type !== 'single')
        throw new Error('Invalid trip type (not "single") ' + JSON.stringify(data, null, 4))
    
    const {
        name,
        owner: email,
        description,
        coverImageUrl,
        plans,
    } = data
    
    const user = await db
        .select()
        .from(schemas.users)
        .where(eq(schemas.users.email, email))
    
    if (!user)
        throw new Error(`User not found with email "${email}"`)
    
    console.log('Creating trip', name)
    const insertedTrips = await db
        .insert(schemas.trips)
        .values({
            name,
            description,
            coverImageUrl,
        })
        .returning({
            id: schemas.trips.id,
            name: schemas.trips.name,
        })
    
    const trip = insertedTrips[0]
    
    console.log('Adding user', email, 'to trip', name)
    await db.insert(schemas.userTrips).values({
        userId: user[0].id,
        tripId: trip.id,
    })
    
    for (const plan of plans) {
        
        console.log('Creating plan', plan.name)
        const insertedPlans = await db
            .insert(schemas.plans)
            .values({
                tripId: trip.id,
                name: plan.name,
            })
            .returning({
                id: schemas.plans.id,
                tripId: schemas.plans.tripId,
                name: schemas.plans.name,
            })
        
        console.log('Creating', plan.segments.length, 'segments for plan', plan.name)
        
        for (const segment of plan.segments) {
            await importSegment(trip.id, insertedPlans[0], segment)
        }
        
    }
    
}

const importTrips = async data => {
    
    for (const trip of data.trips) {
        
        await importTrip({ ...trip, type: 'single' })
        
    }
    
}

const main = async () => {
    
    if (!tripsFile?.length)
        throw new Error('Invalid trips file')
    
    if (!fs.existsSync(tripsFile))
        throw new Error('Trips file doesn\'t exist')
    
    try {
        
        const data = JSON.parse(fs.readFileSync(tripsFile, 'utf8'))
        
        switch (data.type) {
            case 'single':
                return await importTrip({ ...data, type: 'single' })
            case 'multiple':
                return await importTrips(data)
            default:
                throw new Error(`Unknown type "${data.type}"; expected "single" or "multiple"`)
        }
        
    } catch (e) {
        
        console.error(e)
        throw new Error('Failed to read trips file')
        
    }
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log({ args, tripsFile })
        console.log(usage)
        console.error(e)
        process.exit(1)
    })
