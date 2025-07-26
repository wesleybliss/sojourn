import 'dotenv/config'
// import '../envConfig'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

if (!process.env.TURSO_DATABASE_URL?.length) {
    console.error('Missing TURSO_DATABASE_URL env var', JSON.stringify(process.env, null, 2))
    throw new Error('Missing TURSO_DATABASE_URL env var')
}

export const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle({
    connection: {
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    },
})

export default db
