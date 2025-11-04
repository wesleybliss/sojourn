import { createClient } from '@libsql/client/web'

let client

/**
 * Get or create the browser-side libSQL client with embedded replica.
 * Uses IndexedDB for local persistence and syncs with Turso cloud.
 * @returns {import('@libsql/client').Client}
 */
export const getClientDb = () => {
    if (client) return client
    
    if (typeof window === 'undefined') {
        throw new Error('clientDb must only be used in the browser')
    }
    
    const syncUrl = process.env.NEXT_PUBLIC_TURSO_DATABASE_URL
    const authToken = process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN
    
    if (!syncUrl || !authToken) {
        throw new Error('Missing NEXT_PUBLIC_TURSO_DATABASE_URL or NEXT_PUBLIC_TURSO_AUTH_TOKEN')
    }
    
    // Create embedded replica: IndexedDB-backed local DB that syncs with Turso
    client = createClient({
        url: syncUrl,
        authToken,
        syncUrl,
        syncInterval: 60, // Auto-sync every 60 seconds when online
    })
    
    return client
}

/**
 * Execute a SQL query on the local database.
 * @param {string} sql - SQL query string
 * @param {Array} args - Query parameters
 * @returns {Promise<import('@libsql/client').ResultSet>}
 */
export const executeQuery = async (sql, args = []) => {
    const db = getClientDb()
    return db.execute({ sql, args })
}

/**
 * Execute multiple statements in a transaction.
 * @param {Function} fn - Async function that receives the db client
 * @returns {Promise<any>} - Result from the transaction function
 */
export const withTransaction = async fn => {
    const db = getClientDb()
    return db.transaction(fn)
}

/**
 * Manually trigger a sync with Turso cloud.
 * @param {Object} options - Sync options
 * @returns {Promise<void>}
 */
export const syncDb = async (options = {}) => {
    const db = getClientDb()
    if (typeof db.sync === 'function') {
        await db.sync(options)
    } else {
        console.warn('Sync method not available on this client')
    }
}

/**
 * Get all table names from the local database.
 * Useful for verification (e.g., ensuring users table isn't synced).
 * @returns {Promise<string[]>}
 */
export const getTableNames = async () => {
    const result = await executeQuery(
        'SELECT name FROM sqlite_schema WHERE type = ? ORDER BY name',
        ['table'],
    )
    return result.rows.map(row => row.name)
}
