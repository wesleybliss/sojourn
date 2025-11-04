import { useEffect, useState } from 'react'

/**
 * Hook to detect browser online/offline status.
 * Returns true when online, false when offline.
 * @returns {boolean} Online status
 */
export const useOnlineStatus = () => {
    const [online, setOnline] = useState(
        typeof navigator !== 'undefined' ? navigator.onLine : true
    )

    useEffect(() => {
        const handleOnline = () => setOnline(true)
        const handleOffline = () => setOnline(false)
        
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
        
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    return online
}

export default useOnlineStatus
