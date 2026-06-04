import { Plan, Trip } from '@repo/shared/types'
import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { useCallback } from 'react'
import { toast } from 'sonner'

import { useClonePlan, useCreatePlan,useDeletePlan, useUpdatePlan } from '@/lib/queries/plans'
import { useRouter } from '@/lib/router'

const PlanActionsViewModel = (
    currentTrip: Trip | null,
    currentPlan: Plan | null,
) => {
    
    const router = useRouter()
    
    const [createPlanDialogOpen, setCreatePlanDialogOpen] = useState(false)
    const [renamePlanDialogOpen, setRenamePlanDialogOpen] = useState(false)
    
    // React Query
    const queryClient = useQueryClient()
    const createPlanMutation = useCreatePlan()
    const updatePlanMutation = useUpdatePlan()
    const deletePlanMutation = useDeletePlan()
    const clonePlanMutation = useClonePlan()
    
    const createPlan = useCallback(async (name: string) => {
        
        if (!currentTrip) return
        
        if (!name?.length) return console.warn('createPlan empty name')
        
        createPlanMutation.mutate({ tripId: currentTrip.id, name }, {
            onSuccess: result => {
                toast('Plan created')
                // queryClient.invalidateQueries(['trip', currentTrip.id])
                if (result.data)
                    router.push(`/trips/${currentTrip.id}/plans/${result.data.id}`)
            },
        })
        
    }, [createPlanMutation, currentTrip, router])
    
    const updatePlan = useCallback((field: string) => async (e: string | ChangeEvent<HTMLInputElement>) => {
        
        if (!currentTrip) return
        if (!currentPlan) return
        
        const value = typeof e === 'string'
            ? e
            : (e?.target?.value ?? e).trim()
        
        if (!value?.length) return console.warn('updatePlan empty name')
        
        updatePlanMutation.mutate({ tripId: currentTrip.id, planId: currentPlan.id, [field]: value }, {
            onSuccess: () => {
                toast('Plan renamed')
                // queryClient.invalidateQueries(['trip', currentTrip.id])
            },
        })
        
    }, [updatePlanMutation, currentTrip, currentPlan])
    
    const deletePlan = useCallback(async () => {
        
        if (!currentTrip)
            return console.warn('useNavbarViewModel#deletePlan no trip selected')
        
        if (!currentPlan)
            return console.warn('useNavbarViewModel#deletePlan no plan selected')
        
        if (!confirm('Are you sure you want to delete this plan?'))
            return
        
        deletePlanMutation.mutate({ tripId: currentTrip.id, planId: currentPlan.id }, {
            onSuccess: () => {
                toast('Plan deleted')
                // queryClient.invalidateQueries(['trip', currentTrip.id])
                router.push(`/trips/${currentTrip.id}`)
            },
        })
        
    }, [deletePlanMutation, currentTrip, currentPlan, router])
    
    const clonePlan = useCallback(async () => {
        
        if (!currentTrip || !currentPlan) return toast.error('No trip or plan selected to clone')
        
        clonePlanMutation.mutate({ tripId: currentTrip.id, planId: currentPlan.id }, {
            onSuccess: result => {
                toast('Plan cloned')
                // queryClient.invalidateQueries(['trip', currentTrip.id])
                if (result.data)
                    router.push(`/trips/${currentTrip.id}/plans/${result.data.id}`)
            },
        })
        
    }, [clonePlanMutation, currentPlan, currentTrip, router])
    
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
