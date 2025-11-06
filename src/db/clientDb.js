import { createClient } from '@libsql/client'

let db
let isInitialized = false
let initPromise = null

export const getClientDb = async () => {
    if (db && isInitialized) return db
    if (initPromise) return initPromise
    
    if (typeof window === 'undefined') {
        throw new Error('clientDb must only be used in the browser')
    }
    
    const url = process.env.NEXT_PUBLIC_TURSO_DATABASE_URL
    const authToken = process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN
    
    if (!url || !authToken) {
        throw new Error('Missing NEXT_PUBLIC_TURSO_DATABASE_URL or NEXT_PUBLIC_TURSO_AUTH_TOKEN')
    }
    
    initPromise = (async () => {
        db = await createClient({
            url,
            authToken,
            intMode: 'number',
            syncMode: 'auto'
        })
        
        console.info('[ClientDB] ✅ Connected with auto-sync')
        
        isInitialized = true
        return db
    })()
    
    return initPromise
}
