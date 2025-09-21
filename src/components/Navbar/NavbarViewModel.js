import { useWireValue } from '@forminator/react-wire'
import * as store from '@/store'
import { useSession } from 'next-auth/react'
import useDebug from '@/hooks/useDebug'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useClonePlan, useUpdateTrip } from '@/lib/queries/trip'
import { useUpdatePlan } from '@/lib/queries/plans'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useBackupTrips } from '@/lib/queries/backups'

const NavbarViewModel = () => {
    
    const router = useRouter()
    const { data: session } = useSession()
    const user = session?.user
    
    const currentTrip = useWireValue(store.currentTrip)
    const plans = useWireValue(store.currentPlans)
    const currentPlan = useWireValue(store.currentPlan)
    const segments = useWireValue(store.currentSegments)
    const shengenData = useWireValue(store.shengenData)
    
    const queryClient = useQueryClient()
    const updateTripMutation = useUpdateTrip()
    const backupMutation = useBackupTrips()
    const updatePlanMutation = useUpdatePlan()
    const clonePlanMutation = useClonePlan()
    
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
    
    const updatePlan = useCallback(field => async e => {
        
        if (!currentTrip) return
        if (!currentPlan) return
        
        const value = (e?.target?.value ?? e).trim()
        
        if (!value?.length) return console.warn('updatePlan empty name')
        
        updatePlanMutation.mutate({ tripId: currentTrip.id, planId: currentPlan.id, [field]: value }, {
            onSuccess: () => {
                toast('Plan renamed')
                // queryClient.invalidateQueries(['trip', currentTrip.id])
            },
        })
        
    }, [updatePlanMutation, queryClient, currentTrip, currentPlan])
    
    const clonePlan = useCallback(async () => {
        
        if (!currentTrip || !currentPlan) return toast.error('No plan selected to clone')
        
        clonePlanMutation.mutate({ planId: currentPlan.id }, {
            onSuccess: newPlan => {
                toast('Plan cloned')
                queryClient.invalidateQueries(['trip', currentTrip.id])
                router.push(`/trips/${currentTrip.id}/plans/${newPlan.id}`)
            },
        })
        
    }, [clonePlanMutation, currentPlan, queryClient, currentTrip, router])
    
    useDebug()
    
    return {
        
        // Hooks
        router,
        queryClient,
        
        // State
        user,
        currentTrip,
        plans,
        currentPlan,
        segments,
        shengenData,
        
        // Mutations
        updateTripMutation,
        backupTrip,
        clonePlanMutation,
        
        // Methods
        updateTrip,
        updatePlan,
        clonePlan,
        
    }
    
}

export default NavbarViewModel
