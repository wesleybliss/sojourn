// noinspection SqlNoDataSourceInspection

import 'dotenv/config'
import db from '@repo/shared/db/index'
import * as schemas from '@repo/shared/db/schema'
import { sql } from 'drizzle-orm'

const main = async () => {
    
    // Option 1: Simple DELETE (doesn't reset auto-increment ID)
    // await db.delete(schemas.trips)
    // console.log('Trips table deleted (rows removed).')
    
    // Option 2: Truncate and reset auto-increment ID (more like a traditional TRUNCATE)
    await db.delete(schemas.trips) // Delete all rows
    await db.run(sql`DELETE FROM sqlite_sequence WHERE name = 'trips'`) // Reset auto-increment sequence
    
    console.log('Trips table truncated and auto-increment ID reset.')
    
    await Promise.allSettled(Object.keys(schemas).map(async it => {
        if (it === 'users') return
        // @ts-ignore
        await db.delete(schemas[it])
        await db.run(sql`DELETE FROM sqlite_sequence WHERE name = '${it}'`)
    }))
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
