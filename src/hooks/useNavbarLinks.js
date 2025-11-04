import { useMemo } from 'react'
import { toast } from 'sonner'

const useNavbarLinks = (user, trips, backupMutation, debugDumpData, setDeleteDatabaseDialogOpen, isOnline) => {
    
    return useMemo(() => {
        
        if (!user || !trips?.data)
            return [
                ['/', 'Home'],
                ['/login', 'Login'],
                ['/signup', 'Sign Up'],
            ]
        
        // Url, label, [onClick]
        return [
            ['/', 'Home'],
            ['/trips', 'Trips'],
            ['/debug', 'Debug'],
            ['#debug:dump', 'Debug/Dump', debugDumpData(trips?.data)],
            ['#debug:clear', 'Debug/Clear', e => {
                e.preventDefault()
                if (!isOnline) {
                    toast.error('This action requires an internet connection')
                    return
                }
                setDeleteDatabaseDialogOpen(true)
            }],
            /* ['#debug:backup', 'Backup', async e => {
                e.preventDefault()
                
                try {
                    
                    const backupData = {
                        version: '1.0',
                        exportDate: new Date().toISOString(),
                        trips: trips.data,
                    }
                    
                    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
                        type: 'application/json',
                    })
                    
                    const url = URL.createObjectURL(blob)
                    // eslint-disable-next-line no-restricted-globals
                    const a = document.createElement('a')
                    
                    a.href = url
                    a.download = `trip-planner-backup-${new Date().toISOString().split('T')[0]}.json`
                    
                    // eslint-disable-next-line no-restricted-globals
                    document.body.appendChild(a)
                    
                    a.click()
                    
                    // eslint-disable-next-line no-restricted-globals
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                    
                    toast.success('Backup file downloaded')
                } catch (error) {
                    console.error('Error creating backup:', error)
                    toast.error('Failed to create backup')
                }
            }], */
            ['#debug:backup', 'Backup', async e => {
                e.preventDefault()
                
                if (!isOnline) {
                    toast.error('Backup requires an internet connection')
                    return
                }
                
                try {
                    await backupMutation.mutateAsync({ type: 'multiple' })
                    toast.success('Backup file downloaded')
                } catch (error) {
                    console.error('Error creating backup:', error)
                    toast.error('Failed to create backup')
                }
            }],
        ]
    }, [trips, user, backupMutation, isOnline])
    
}

export default useNavbarLinks
