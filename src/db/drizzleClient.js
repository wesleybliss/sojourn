import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '@/db/schema'
import { getClientDb } from '@/db/clientDb'

let drizzleDb

export const getDrizzleDb = async () => {
    if (drizzleDb) return drizzleDb
    
    if (typeof window === 'undefined') {
        throw new Error('getDrizzleDb must be used in the browser')
    }
    
    const client = await getClientDb()
    drizzleDb = drizzle(client, { schema })
    
    return drizzleDb
}
