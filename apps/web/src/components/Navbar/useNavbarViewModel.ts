import { useWireState, useWireValue } from '@forminator/react-wire'
import { ApiResult, BackupTripsBody, Plan, Trip, TripInsert } from '@repo/shared/types'
import { UseMutationResult } from '@tanstack/react-query'
import { User as FirebaseUser } from 'firebase/auth'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { useAuth } from '@/components/providers/AuthProvider'
import { useBackupTrips } from '@/lib/queries/backups'
import { useCreateTripMutation } from '@/lib/queries/trip'
import { RouterLike, usePathname, useRouter } from '@/lib/router'
import * as store from '@/store'

export type TNavbarViewModel = {
    // Hooks
    router: RouterLike
    pathname: string
    loading: boolean
    firebaseUser: FirebaseUser | null
    
    // Global State
    currentTrip: Trip | null
    currentPlan: Plan | null
    showMap: boolean
    setShowMap: Dispatch<SetStateAction<boolean>>
    isTripEditMode: boolean
    setIsTripEditMode: Dispatch<SetStateAction<boolean>>
    
    // Mutations
    createTripMutation: UseMutationResult<ApiResult<Trip | null>, Error, Partial<TripInsert>, unknown>
    backupMutation: UseMutationResult<{ filename: string }, Error, BackupTripsBody, unknown>
    
    // Memos
    isTripWorkspace: boolean
    isPlacesPage: boolean
    isImportPage: boolean
    title: string
    subtitle: string
    importButtonLabel: string
    
    // Methods
    handleCreateTrip: () => Promise<void>
    handleImportOrBackup: () => Promise<void>
    
}

const useNavbarViewModel = (): TNavbarViewModel => {
    
    const router = useRouter()
    const pathname = usePathname()
    
    const { firebaseUser, loading } = useAuth()
    
    const currentTrip = useWireValue(store.currentTrip)
    const currentPlan = useWireValue(store.currentPlan)
    const [showMap, setShowMap] = useWireState(store.showMap)
    const [isTripEditMode, setIsTripEditMode] = useWireState(store.isTripEditMode)
    
    const createTripMutation = useCreateTripMutation()
    const backupMutation = useBackupTrips()
    
    const isTripWorkspace = pathname?.startsWith('/trips/')
    const isPlacesPage = pathname?.startsWith('/places')
    const isImportPage = pathname?.startsWith('/import-trips')
    const title = isTripWorkspace
        ? currentTrip?.name || 'Trip Planner'
        : isPlacesPage
            ? 'My Places'
            : isImportPage
                ? 'Import & Restore'
                : 'Ongoing Journeys'
    
    const subtitle = isTripWorkspace
        ? currentTrip?.description || 'Operational view across segments, timing, and route context.'
        : isPlacesPage
            ? 'Research saved destinations, notes, and travel windows in one workspace.'
            : isImportPage
                ? 'Bring in prior backups or stage new itineraries.'
                : 'Track active itineraries, their latest changes, and next planning steps.'
    
    const importButtonLabel = isTripWorkspace ? 'Backup Trip' : 'Import / Backup'
    
    const handleCreateTrip = async () => {
        
        try {
            const result = await createTripMutation.mutateAsync({
                name: 'New Trip',
                description: '',
            })
            
            if (result.data)
                router.push(`/trips/${result.data.id}`)
        } catch (error) {
            console.error('Navbar.handleCreateTrip', error)
            toast.error('Failed to create trip')
        }
        
    }
    
    const handleImportOrBackup = async () => {
        
        if (isTripWorkspace && currentTrip) {
            
            try {
                
                await backupMutation.mutateAsync({
                    type: 'single',
                    tripId: currentTrip.id,
                })
                
                toast.success('Backup generated')
                
            } catch (e) {
                
                console.error('Navbar.handleImportOrBackup', e)
                toast.error('Backup failed')
                
            }
            
            return
            
        }
        
        router.push('/import-trips')
        
    }
    
    return {
        
        // Hooks
        router,
        pathname,
        loading,
        firebaseUser,
        
        // Global State
        currentTrip,
        currentPlan,
        showMap,
        setShowMap,
        isTripEditMode,
        setIsTripEditMode,
        
        // Mutations
        createTripMutation,
        backupMutation,
        
        // Memos
        isTripWorkspace,
        isPlacesPage,
        isImportPage,
        title,
        subtitle,
        importButtonLabel,
        
        // Methods
        handleCreateTrip,
        handleImportOrBackup,
        
    }
    
}

export default useNavbarViewModel
