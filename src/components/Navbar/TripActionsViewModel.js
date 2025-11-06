import { useState } from 'react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useUpdateTrip } from '@/lib/queries/trip'
import { useQueryClient } from '@tanstack/react-query'
import { useBackupTrips } from '@/lib/queries/backups'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

const TripActionsViewModel = currentTrip => {
    
    const [newTripName, setNewTripName] = useState('')
    const [renameTripDialogOpen, setRenameTripDialogOpen] = useState(false)
    
    // React Query
    const queryClient = useQueryClient()
    const updateTripMutation = useUpdateTrip()
    const backupMutation = useBackupTrips()
    const online = useOnlineStatus()
    
    const syncRemoteDatabase = useCallback(async () => {
        if (!online) {
            toast.error('Cannot sync while offline')
            return
        }
        try {
            toast.loading('Refreshing data...')
            await queryClient.invalidateQueries()
            toast.success('Data refreshed successfully')
        } catch (error) {
            console.error('Refresh failed:', error)
            toast.error('Failed to refresh data')
        }
    }, [online, queryClient])

    const updateTrip = useCallback(field => async e => {
        
        if (!currentTrip) return
        
        const value = (e?.target?.value ?? e).trim()
        
        if (!value?.length) return console.warn('updateTrip empty name')
        
        updateTripMutation.mutate({ tripId: currentTrip.id, [field]: value }, {
            onSuccess: () => {
                toast('Trip updated')
                
                // @todo THIS makes bad refresh flicker
                // queryClient.invalidateQueries(['trip', currentTrip.id])
            },
        })
        
    }, [currentTrip, updateTripMutation, queryClient])
    
    const backupTrip = useCallback(async () => {
        
        if (!currentTrip) return console.warn('NavbarViewModel#backupTrip no trip selected')
        
        try {
            await backupMutation.mutateAsync({ type: 'single', tripId: [currentTrip?.id] })
            toast.success('Backup file downloaded')
        } catch (error) {
            console.error('Error creating backup:', error)
            toast.error('Failed to create backup')
        }
        
    }, [currentTrip])
    
    return {
        
        // Hooks
        queryClient,
        
        // State
        newTripName,
        setNewTripName,
        renameTripDialogOpen,
        setRenameTripDialogOpen,
        online,
        
        // React Query
        syncRemoteDatabase,
        updateTrip,
        backupTrip,
        
    }
    
}

export default TripActionsViewModel
