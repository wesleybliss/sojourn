import { useEffect, useRef } from 'react'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { syncDb } from '@/db/clientDb'

/**
 * Hook that automatically syncs the local database with Turso cloud
 * when the browser reconnects to the internet.
 * 
 * Usage: Call this hook once in your root layout or app component.
 */
export const useAutoSync = () => {
    const online = useOnlineStatus()
    const prevOnline = useRef(online)
    
    useEffect(() => {
        // Trigger sync when transitioning from offline to online
        if (!prevOnline.current && online) {
            console.log('[AutoSync] Reconnected - syncing with cloud...')
            syncDb().catch(err => {
                console.error('[AutoSync] Sync failed:', err)
            })
        }
        
        prevOnline.current = online
    }, [online])
}

export default useAutoSync
