import { useMutation, useQueryClient } from '@tanstack/react-query'

const idToInt = obj => obj?.id ? parseInt(obj?.id, 10) : null

export const useBackupTrips = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ type = 'multiple', tripIds = null } = {}) => {
            const body = { type }
            
            if (Array.isArray(tripIds))
                body.tripIds = tripIds
                    .map(id => (typeof id === 'object' ? idToInt(id) : parseInt(id, 10)))
                    .filter(Boolean)
            
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
            const a = document.createElement('a')
            
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
            
            return { filename }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['trips'])
        },
    })
}
