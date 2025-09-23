import { useState } from 'react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useDeletePlan } from '@/lib/queries/trip'
import { useUpdatePlan, useClonePlan, useCreatePlan } from '@/lib/queries/plans'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const PlanActionsViewModel = (currentTrip, currentPlan) => {
    
    const router = useRouter()
    
    const [createPlanDialogOpen, setCreatePlanDialogOpen] = useState(false)
    const [renamePlanDialogOpen, setRenamePlanDialogOpen] = useState(false)
    
    // React Query
    const queryClient = useQueryClient()
    const createPlanMutation = useCreatePlan()
    const updatePlanMutation = useUpdatePlan()
    const deletePlanMutation = useDeletePlan()
    const clonePlanMutation = useClonePlan()
    
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
    
    return {
        
        // Hooks
        router,
        queryClient,
        
        // State
        createPlanDialogOpen,
        setCreatePlanDialogOpen,
        renamePlanDialogOpen,
        setRenamePlanDialogOpen,
        
        // Methods
        createPlan,
        updatePlan,
        deletePlan,
        clonePlan,
        
    }
    
}

export default PlanActionsViewModel
