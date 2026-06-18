#!/usr/bin/env node

import sqliteDatabase from '@repo/shared/db/db-sqlite'
import postgresDatabase from '@repo/shared/db/db-postgres'
import * as schemas from '@repo/shared/db/schema'
import cliProgress from 'cli-progress'

const main = async () => {
    
    
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
