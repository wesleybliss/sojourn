import 'dotenv/config'

import { createClient } from '@libsql/client/http'
import { relations } from '@repo/shared/db/relations'
import * as schema from '@repo/shared/db/schema'
import { drizzle } from 'drizzle-orm/libsql/http'

if (!process.env.TURSO_DATABASE_URL?.length) {
    console.error('Missing TURSO_DATABASE_URL env var', JSON.stringify(process.env, null, 2))
    throw new Error('Missing TURSO_DATABASE_URL env var')
}

export const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle({
    client: turso,
    schema,
    relations,
})

export default db
