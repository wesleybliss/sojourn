import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchWithAuth, fetchJSON } from '@/lib/api'
import { ItemWithId } from '@/types/data'

const idToInt = (obj: ItemWithId | null) => obj?.id ?? null

type BackupTripsBody = {
    type: 'single' | 'multiple'
    tripId?: number | null
    tripIds?: (number | null)[] | null
}

export const useBackupTrips = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ type = 'multiple', tripId = null, tripIds = null }: BackupTripsBody) => {
            const body: BackupTripsBody = { type }
            
            if (Array.isArray(tripIds))
                body.tripIds = tripIds
                    .map(id => (typeof id === 'object' ? idToInt(id) : id))
                    .filter(Boolean)
            else
                body.tripId = tripId
            
            const res = await fetchWithAuth('/api/trips/backup', {
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
            queryClient.invalidateQueries({
                queryKey: ['trips'],
            })
        },
    })
}

export const useRestoreTrips = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async backupData => {
            return fetchJSON('/api/trips/restore', {
                method: 'POST',
                body: JSON.stringify(backupData),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['trips'],
            })
        },
    })
}
