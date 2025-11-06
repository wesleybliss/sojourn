/**
 * Safely call syncDb with dynamic import to avoid SSR/build issues with WASM.
 * This is a helper to avoid repeating the dynamic import pattern everywhere.
 * 
 * @returns {Promise<boolean>} - True if changes were pulled
 */
export const syncDbSafe = async () => {
    if (typeof window === 'undefined') {
        console.warn('[syncDbSafe] Called on server-side, skipping')
        return false
    }
    
    try {
        const { syncDb } = await import('@/db/clientDb')
        return await syncDb()
    } catch (err) {
        console.error('[syncDbSafe] Sync failed:', err)
        throw err
    }
}
