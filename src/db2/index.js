import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

// Function to get database configuration
function getDatabaseConfig() {
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN
    
    console.log('🔍 Checking environment variables...')
    console.log('TURSO_DATABASE_URL:', url ? '✅ SET' : '❌ NOT SET')
    console.log('TURSO_AUTH_TOKEN:', authToken ? '✅ SET' : '❌ NOT SET')
    
    if (!url) {
        console.error('❌ TURSO_DATABASE_URL is required')
        console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('TURSO')))
        throw new Error('TURSO_DATABASE_URL environment variable is not set')
    }
    
    if (!authToken) {
        console.error('❌ TURSO_AUTH_TOKEN is required')
        throw new Error('TURSO_AUTH_TOKEN environment variable is not set')
    }
    
    return { url, authToken }
}

// Create database connection lazily
let _db = null
let _turso = null

export function getDb() {
    if (!_db) {
        const config = getDatabaseConfig()
        console.log('✅ Creating database connection...')
        _turso = createClient(config)
        _db = drizzle(_turso)
        console.log('✅ Database connection created successfully')
    }
    return _db
}

export function getTurso() {
    if (!_turso) {
        getDb() // This will initialize both
    }
    return _turso
}

// For backwards compatibility, create the connection immediately
// but wrap it in a try-catch to provide better error handling
try {
    const db = getDb()
    export { db }
    export default db
    export const turso = getTurso()
} catch (error) {
    console.error('❌ Failed to initialize database:', error.message)
    // Don't throw here, let individual API calls handle it
    export const db = null
    export default null
    export const turso = null
}
