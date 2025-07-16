import 'dotenv/config'
import path from 'node:path'
import db from '../../db2/index.js'
import * as schemas from '../../db2/schema.js'
import { eq } from 'drizzle-orm'

const args = process.argv.slice(2)
const [teamId, email] = args

const script = path.basename(process.argv[0])
const usage = `USAGE: ${script} <team-ID> <email>`

const main = async () => {
    
    if (!teamId?.length)
        throw new Error('Invalid team ID')
    
    if (!email?.length || !email?.includes('@'))
        throw new Error('Invalid email')
    
    const team = await db
        .select()
        .from(schemas.teams)
        .where(eq(schemas.teams.id, teamId))
    
    if (!team)
        throw new Error('Team not found')
    
    const user = await db
        .select()
        .from(schemas.users)
        .where(eq(schemas.users.email, email))
    
    if (!user)
        throw new Error('User not found')
    
    // Add user to team using the many-to-many relationship
    await db.insert(schemas.userTeams).values({
        userId: user[0].id,
        teamId: team[0].id,
    })
    
    console.log(`Successfully added user ${email} to team ${team[0].name}`)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log({ args, teamId, email })
        console.log(usage)
        console.error(e)
        process.exit(1)
    })
