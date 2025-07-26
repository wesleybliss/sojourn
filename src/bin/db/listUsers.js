import 'dotenv/config'
import db from '@/db/index.js'
import * as schemas from '@/db/schema.js'

const main = async () => {
    
    const users = await db
        .select()
        .from(schemas.users)
    
    console.table(users)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
