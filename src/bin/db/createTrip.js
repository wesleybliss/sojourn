import 'dotenv/config'
import path from 'node:path'
import db from '../../db2/index.js'
import * as schemas from '../../db2/schema.js'
import { eq } from 'drizzle-orm'

const args = process.argv.slice(2)
const [name, email] = args

const script = path.basename(process.argv[0])
const usage = `USAGE: ${script} <trip-name> [initial-member-email]`

const main = async () => {
    
    if (!name?.length)
        throw new Error('Invalid trip name')
    
    const data = {
        name,
    }
    
    const insertedTrips = await db
        .insert(schemas.trips)
        .values(data)
        .returning({
            id: schemas.trips.id,
            name: schemas.trips.name,
        })
    
    const trip = insertedTrips[0]
    
    if (email?.length) {
        
        const user = await db
            .select()
            .from(schemas.users)
            .where(eq(schemas.users.email, email))
        
        if (!user)
            throw new Error('User not found')
        
        await db.insert(schemas.userTrips).values({
            userId: user[0].id,
            tripId: trip.id,
        })
        
        console.log(`Successfully added user ${email} to team ${trip.name}`)
        
    }
    
    console.table(data)
    console.table(trip)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log({ args, name, email })
        console.log(usage)
        console.error(e)
        process.exit(1)
    })
