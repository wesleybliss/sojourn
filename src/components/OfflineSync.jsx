'use client'

import { useAutoSync } from '@/hooks/useAutoSync'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useEffect } from 'react'
import { syncDb } from '@/db/clientDb'

/**
 * Component that handles offline-first sync functionality.
 * - Auto-syncs when coming back online
 * - Triggers initial sync on mount
 */
export default function OfflineSync() {
    const online = useOnlineStatus()
    
    // Enable auto-sync on reconnect
    useAutoSync()
    
    // Trigger initial sync when component mounts (if online)
    useEffect(() => {
        if (online) {
            syncDb().catch(err => {
                console.error('[OfflineSync] Initial sync failed:', err)
            })
        }
    }, []) // Only run once on mount
    
    return null // This component doesn't render anything
}
