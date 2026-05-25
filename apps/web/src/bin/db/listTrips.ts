import 'dotenv/config'

import db from '@repo/shared/db/index'
import * as schemas from '@repo/shared/db/schema'

const main = async () => {
    
    const trips = await db
        .select()
        .from(schemas.trips)
    
    console.table(trips)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
