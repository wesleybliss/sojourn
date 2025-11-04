'use client'

import { useState } from 'react'
import { syncDb } from '@/db/clientDb'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

/**
 * Manual sync button component.
 * Allows users to manually trigger a sync with Turso cloud.
 */
export default function SyncButton() {
    const [syncing, setSyncing] = useState(false)
    const online = useOnlineStatus()
    
    const handleSync = async () => {
        if (!online) return
        
        setSyncing(true)
        
        try {
            await syncDb()
        } catch (err) {
            console.error('[SyncButton] Sync failed:', err)
        } finally {
            setSyncing(false)
        }
    }
    
    return (
        <Button
            onClick={handleSync}
            disabled={!online || syncing}
            variant="ghost"
            size="sm"
            title={!online ? 'You are offline' : 'Sync with cloud'}
            className="gap-2">
            <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync'}
        </Button>
    )
}
