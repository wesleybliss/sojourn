import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useUpdateTrip } from '@/lib/queries/trip'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useBackupTrips } from '@/lib/queries/backups'
import { Trip } from '@/types/database'

export type TTripActionsViewModel = {
    // Hooks
    queryClient: QueryClient
    
    // State
    currentTrip: Trip | undefined
    newTripName: string
    setNewTripName: Dispatch<SetStateAction<string>>
    renameTripDialogOpen: boolean
    setRenameTripDialogOpen: Dispatch<SetStateAction<boolean>>
    
    // React Query
    updateTrip: (field: keyof Trip) => (e: string | ChangeEvent<HTMLInputElement>) => Promise<void>
    backupTrip: () => Promise<void>
}

const TripActionsViewModel = (currentTrip: Trip | undefined): TTripActionsViewModel => {
    
    const [newTripName, setNewTripName] = useState<string>('')
    const [renameTripDialogOpen, setRenameTripDialogOpen] = useState<boolean>(false)
    
    // React Query
    const queryClient = useQueryClient()
    const updateTripMutation = useUpdateTrip()
    const backupMutation = useBackupTrips()
    
    const updateTrip = useCallback((field: keyof Trip) => async (e: string | ChangeEvent<HTMLInputElement>) => {
        
        if (!currentTrip) return
        
        const value = ((e as ChangeEvent<HTMLInputElement>)?.target?.value ?? e).trim()
        
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
            await backupMutation.mutateAsync({ type: 'single', tripId: currentTrip?.id })
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
        currentTrip,
        newTripName,
        setNewTripName,
        renameTripDialogOpen,
        setRenameTripDialogOpen,
        
        // React Query
        updateTrip,
        backupTrip,
        
    }
    
}

export default TripActionsViewModel
