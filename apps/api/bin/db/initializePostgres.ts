#!/usr/bin/env node

import postgresDatabase from '@repo/shared/db/db-postgres'
import sqliteDatabase from '@repo/shared/db/db-sqlite'
import * as schemas from '@repo/shared/db/schema'
import cliProgress from 'cli-progress'

const main = async () => {
    
    const res = await postgresDatabase.execute('select now();')
    
    console.log(res)
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
