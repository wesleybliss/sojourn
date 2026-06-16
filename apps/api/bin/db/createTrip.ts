import 'dotenv/config'

import path from 'node:path'

import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import type { TripInsert } from '@repo/shared/types'
import { eq } from 'drizzle-orm'

const args = process.argv.slice(2)
const [teamId, name, email] = args

const script = path.basename(process.argv[0])
const usage = `USAGE: ${script} <trip-name> <initial-member-email>`

const main = async () => {
    
    if (!teamId?.length)
        throw new Error('Invalid team ID')
    
    if (!email?.length)
        throw new Error('Invalid email')
    
    if (!name?.length)
        throw new Error('Invalid trip name')
    
    const user = await db
        .select()
        .from(schemas.users)
        .where(eq(schemas.users.email, email))
    
    if (!user || !Array.isArray(user) || user.length === 0)
        throw new Error('User not found')
    
    const team = await db
        .select()
        .from(schemas.teams)
        .where(eq(schemas.teams.id, parseInt(teamId, 10)))
    
    if (!team || !Array.isArray(team) || team.length === 0)
        throw new Error('Team not found')
    
    const data: TripInsert = {
        userId: user[0].id,
        teamId: team[0].id,
        name,
    }
    
    const [trip] = await db
        .insert(schemas.trips)
        .values(data)
        .returning({
            id: schemas.trips.id,
            name: schemas.trips.name,
        })
    
    console.log(`Successfully added user ${email} to team ${trip.name}`)
    
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
