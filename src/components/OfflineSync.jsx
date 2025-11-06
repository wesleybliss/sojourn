'use client'

import { useAutoSync } from '@/hooks/useAutoSync'

/**
 * Component that handles offline-first sync functionality.
 * - Auto-syncs when coming back online
 * - Initial sync is handled by individual queries after they complete
 */
export default function OfflineSync() {
    // Enable auto-sync on reconnect
    useAutoSync()
    
    return null // This component doesn't render anything
}
