import 'dotenv/config'
import db from '../../db2/index.js'
import * as schemas from '../../db2/schema.js'
import { eq } from 'drizzle-orm'

const main = async () => {
    
    const teams = await db
        .select()
        .from(schemas.teams)
    
    for (const team of teams) {
        
        console.table(teams)
        
        const members = await db
            .select({
                id: schemas.users.id,
                email: schemas.users.email,
                createdAt: schemas.userTeams.createdAt,
            })
            .from(schemas.userTeams)
            .innerJoin(schemas.users, eq(schemas.userTeams.userId, schemas.users.id))
            .where(eq(schemas.userTeams.teamId, team.id))
        
        console.table(members)
        
    }
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
