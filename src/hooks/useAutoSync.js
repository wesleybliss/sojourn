import { useEffect, useRef } from 'react'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

export const useAutoSync = () => {
    const online = useOnlineStatus()
    const prevOnline = useRef(online)
    
    useEffect(() => {
        if (!prevOnline.current && online) {
            console.log('[AutoSync] Reconnected - auto-sync will handle sync')
        }
        prevOnline.current = online
    }, [online])
}

export default useAutoSync
