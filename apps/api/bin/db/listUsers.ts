import 'dotenv/config'

import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'

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
