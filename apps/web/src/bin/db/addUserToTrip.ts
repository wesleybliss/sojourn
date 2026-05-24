import 'dotenv/config'
import path from 'node:path'
import db from '@repo/shared/db/index'
import * as schemas from '@repo/shared/db/schema'
import { eq } from 'drizzle-orm'

const args = process.argv.slice(2)
const [tripId, email] = args

const script = path.basename(process.argv[0])
const usage = `USAGE: ${script} <team-ID> <email>`

const main = async () => {
    
    if (!tripId?.length)
        throw new Error('Invalid trip ID')
    
    if (!email?.length || !email?.includes('@'))
        throw new Error('Invalid email')
    
    const trip = await db
        .select()
        .from(schemas.trips)
        .where(eq(schemas.trips.id, parseInt(tripId, 10)))
    
    if (!trip)
        throw new Error('Team not found')
    
    const user = await db
        .select()
        .from(schemas.users)
        .where(eq(schemas.users.email, email))
    
    if (!user)
        throw new Error('User not found')
    
    // Add user to team using the many-to-many relationship
    await db.insert(schemas.userTrips).values({
        userId: user[0].id,
        tripId: trip[0].id,
    })
    
    console.log(`Successfully added user ${email} to team ${trip[0].name}`)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log({ args, tripId, email })
        console.log(usage)
        console.error(e)
        process.exit(1)
    })
