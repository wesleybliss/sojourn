import 'dotenv/config'
import { NS } from '@/constants'
import { connect } from '@tursodatabase/database-wasm/turbopack'
import { drizzle } from 'drizzle-orm/libsql'

if (!process.env.TURSO_DATABASE_URL?.length) {
    console.error('Missing TURSO_DATABASE_URL env var', JSON.stringify(process.env, null, 2))
    throw new Error('Missing TURSO_DATABASE_URL env var')
}

const dbConnection = await connect(`${NS}.db`, {
    syncUrl: process.env.TURSO_DATABASE_URL, // 'libsql://your-db-org.turso.io',
    syncToken: process.env.TURSO_AUTH_TOKEN,
    syncInterval: 60, // secs, or false for manual
    tracing: 'debug', // 'info' | 'debug' | 'trace'
})

export const db = drizzle(dbConnection)

export default db
