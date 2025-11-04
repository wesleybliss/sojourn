import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

const idToInt = obj => obj?.id ? parseInt(obj?.id, 10) : null

export const useBackupTrips = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async ({ type = 'multiple', tripId = null, tripIds = null } = {}) => {
            if (!online) {
                throw new Error('Backup requires an internet connection')
            }
            
            const body = { type }
            
            if (Array.isArray(tripIds))
                body.tripIds = tripIds
                    .map(id => (typeof id === 'object' ? idToInt(id) : parseInt(id, 10)))
                    .filter(Boolean)
            else
                body.tripId = tripId
            
            const res = await fetch('/api/trips/backup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            
            if (!res.ok) {
                const json = await res.json().catch(() => null)
                
                throw new Error(json?.error || 'Failed to create backup')
            }
            
            const blob = await res.blob()
            const disposition = res.headers.get('Content-Disposition') || res.headers.get('content-disposition') || ''
            const m = /filename="?([^";]+)"?/.exec(disposition)
            const filename = (m && m[1]) ? m[1] : `trips-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
            
            const url = URL.createObjectURL(blob)
            // eslint-disable-next-line no-restricted-globals
            const a = document.createElement('a')
            
            a.href = url
            a.download = filename
            
            // eslint-disable-next-line no-restricted-globals
            document.body.appendChild(a)
            a.click()
            
            // eslint-disable-next-line no-restricted-globals
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
            
            return { filename }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['trips'])
        },
    })
}

export const useRestoreTrips = () => {
    const queryClient = useQueryClient()
    const online = useOnlineStatus()
    
    return useMutation({
        mutationFn: async backupData => {
            if (!online) {
                throw new Error('Restore requires an internet connection')
            }
            const res = await fetch('/api/trips/restore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backupData),
            })
            
            if (!res.ok) {
                const json = await res.json().catch(() => null)
                
                throw new Error(json?.error || 'Failed to restore backup')
            }
            
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['trips'])
        },
    })
}
