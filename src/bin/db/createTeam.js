import 'dotenv/config'
import path from 'node:path'
import db from '../../db2/index.js'
import * as schemas from '../../db2/schema.js'

const args = process.argv.slice(2)
const [name] = args

const script = path.basename(process.argv[0])
const usage = `USAGE: ${script} <team-name>`

const main = async () => {
    
    if (!name?.length)
        throw new Error('Invalid team name')
    
    const data = {
        name,
    }
    
    const team = await db
        .insert(schemas.teams)
        .values(data)
    
    console.table(data)
    console.table(team)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log({ args, name })
        console.log(usage)
        console.error(e)
        process.exit(1)
    })
