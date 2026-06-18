import 'dotenv/config'

import { relations } from '@repo/shared/db/relations'
import * as schema from '@repo/shared/db/schema'
import { drizzle } from 'drizzle-orm/node-postgres'

if (!process.env.DATABASE_URL?.length) {
    console.error('Missing DATABASE_URL env var', JSON.stringify(process.env, null, 2))
    throw new Error('Missing DATABASE_URL env var')
}

export { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle({
    connection: process.env.DATABASE_URL,
    schema,
    relations,
    // logger: true,
})

export default db
