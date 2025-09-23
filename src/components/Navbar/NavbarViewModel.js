import { useWireValue } from '@forminator/react-wire'
import * as store from '@/store'
import { useSession } from 'next-auth/react'
import useDebug from '@/hooks/useDebug'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useAddSegment, useDeletePlan, useUpdateTrip } from '@/lib/queries/trip'
import { useUpdatePlan, useClonePlan, useCreatePlan } from '@/lib/queries/plans'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useBackupTrips } from '@/lib/queries/backups'
import dayjs from 'dayjs'
import { getTripSegmentNames } from '@/lib/utils.js'

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
    const createPlanMutation = useCreatePlan()
    const updatePlanMutation = useUpdatePlan()
    const deletePlanMutation = useDeletePlan()
    const clonePlanMutation = useClonePlan()
    const addSegmentMutation = useAddSegment()
    
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
    
    const createPlan = useCallback(async name => {
        
        if (!currentTrip) return
        
        if (!name?.length) return console.warn('createPlan empty name')
        
        createPlanMutation.mutate({ tripId: currentTrip.id, name }, {
            onSuccess: newPlan => {
                toast('Plan created')
                // queryClient.invalidateQueries(['trip', currentTrip.id])
                router.push(`/trips/${currentTrip.id}/plans/${newPlan.data.id}`)
            },
        })
        
    }, [createPlanMutation, queryClient, currentTrip, currentPlan, router])
    
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
    
    const deletePlan = useCallback(async () => {
        
        if (!currentTrip)
            return console.warn('NavbarViewModel#deletePlan no trip selected')
        
        if (!currentPlan)
            return console.warn('NavbarViewModel#deletePlan no plan selected')
        
        if (!confirm('Are you sure you want to delete this plan?'))
            return
        
        deletePlanMutation.mutate({ planId: currentPlan.id }, {
            onSuccess: () => {
                toast('Plan deleted')
                // queryClient.invalidateQueries(['trip', currentTrip.id])
                router.push(`/trips/${currentTrip.id}`)
            },
        })
        
    }, [deletePlanMutation, queryClient, currentTrip, currentPlan, router])
    
    const clonePlan = useCallback(async () => {
        
        if (!currentTrip || !currentPlan) return toast.error('No trip or plan selected to clone')
        
        clonePlanMutation.mutate({ planId: currentPlan.id }, {
            onSuccess: clonedPlan => {
                toast('Plan cloned')
                // queryClient.invalidateQueries(['trip', currentTrip.id])
                router.push(`/trips/${currentTrip.id}/plans/${clonedPlan.data.id}`)
            },
        })
        
    }, [clonePlanMutation, currentPlan, queryClient, currentTrip, router])
    
    const addSegment = useCallback(async () => {
        
        if (!currentTrip || !currentPlan)
            return console.warn('addSegment no trip or plan selected')
        
        const newSegment = {
            tripId: currentTrip.id,
            planId: currentPlan.id,
            startDate: dayjs().format('YYYY-MM-DD'),
            endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            name: 'New Segment',
            color: 'bg-blue-500',
        }
        
        addSegmentMutation.mutate(newSegment, {
            onSuccess: () => {
                toast('Segment added')
                // queryClient.invalidateQueries(['trip', currentTrip.id])
            },
        })
        
    }, [currentPlan, addSegmentMutation, queryClient, currentTrip])
    
    const copySegmentNamesToClipboard = useCallback(async () => {
        
        if (!currentTrip || !currentPlan)
            return console.warn('copySegmentNamesToClipboard no trip or plan selected')
        
        await getTripSegmentNames(currentPlan)
        toast.success('Segment names copied to clipboard')
        
    }, [currentTrip, currentPlan])
    
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
        createPlan,
        updatePlan,
        deletePlan,
        clonePlan,
        addSegment,
        copySegmentNamesToClipboard,
        
    }
    
}

export default NavbarViewModel
