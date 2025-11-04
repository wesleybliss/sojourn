import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '@/db/schema'
import { getClientDb } from '@/db/clientDb'

let drizzleDb

/**
 * Get or create the Drizzle ORM instance for the browser.
 * Wraps the libSQL embedded replica client.
 * @returns {import('drizzle-orm/libsql').LibSQLDatabase}
 */
export const getDrizzleDb = () => {
    if (drizzleDb) return drizzleDb
    
    const client = getClientDb()
    drizzleDb = drizzle(client, { schema })
    
    return drizzleDb
}

export default getDrizzleDb
