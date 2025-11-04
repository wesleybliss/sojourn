import { createClient } from '@libsql/client/web'

let client

/**
 * Get or create the browser-side libSQL client.
 * 
 * NOTE: Currently uses HTTP-only mode. Embedded replicas with offline support
 * are not yet available in @libsql/client/web. For true local-first with sync,
 * we need either:
 * 1. Wait for browser embedded replica support in @libsql/client
 * 2. Use @tursodatabase/database-wasm with custom sync logic
 * 3. Implement Service Worker caching for offline HTTP requests
 * 
 * @returns {import('@libsql/client').Client}
 */
export const getClientDb = () => {
    if (client) return client
    
    if (typeof window === 'undefined') {
        throw new Error('clientDb must only be used in the browser')
    }
    
    const url = process.env.NEXT_PUBLIC_TURSO_DATABASE_URL
    const authToken = process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN
    
    if (!url || !authToken) {
        throw new Error('Missing NEXT_PUBLIC_TURSO_DATABASE_URL or NEXT_PUBLIC_TURSO_AUTH_TOKEN')
    }
    
    // Create HTTP client (online-only for now)
    // TODO: Implement proper offline support
    client = createClient({
        url,
        authToken,
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
 * 
 * NOTE: Sync is not available in HTTP-only mode.
 * This is a placeholder for future embedded replica support.
 * 
 * @param {Object} options - Sync options  
 * @returns {Promise<void>}
 */
export const syncDb = async (options = {}) => {
    // HTTP-only mode doesn't support manual sync
    // Data is always fresh from server
    console.info('Sync not needed in HTTP mode - data is always current')
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
