import 'dotenv/config'
import db from '@/db/index'
import * as schemas from '@/db/schema'

const main = async () => {
    
    const plans = await db
        .select()
        .from(schemas.plans)
    
    console.table(plans)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
