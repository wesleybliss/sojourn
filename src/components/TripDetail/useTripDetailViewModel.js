import { useState, useMemo, useCallback, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
    useTripQuery,
    useUpdateTrip,
    useAddSegment,
    useUpdateSegment,
    useDeleteSegments,
    useClonePlan,
    useRenamePlan,
    useDeletePlan,
} from '@/lib/queries/trip.js'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import { calculateTotalDays } from '@/lib/utils.js'

const useTripDetailViewModel = () => {
    
    const params = useParams()
    const router = useRouter()
    const queryClient = useQueryClient()
    
    const { tripId, planId } = params
    
    const { data: trip, error: tripError, isLoading: tripIsLoading } = useTripQuery(tripId)
    
    // Mutations
    const updateTripMutation = useUpdateTrip()
    const addSegmentMutation = useAddSegment()
    const updateSegmentMutation = useUpdateSegment()
    const deleteSegmentsMutation = useDeleteSegments()
    const clonePlanMutation = useClonePlan()
    const renamePlanMutation = useRenamePlan()
    const deletePlanMutation = useDeletePlan()
    
    const [isEditingName, setIsEditingName] = useState(false)
    const [focusedLatLng, setFocusedLatLng] = useState(undefined)
    const [showMap, setShowMap] = useState(false)
    const [cascadeEnabled, setCascadeEnabled] = useState(false)
    
    const plans = useMemo(() => trip?.plans || [], [trip])
    const currentPlan = useMemo(() => {
        console.log('currentPlan', { plans, planId, trip })
        if (planId) return plans.find(p => p.id.toString() === planId)
        return plans?.[0]
    }, [plans, planId])
    
    const segments = useMemo(() => currentPlan?.segments || [], [currentPlan])
    
    const shengenData = useMemo(() => {
        if (!segments?.length) return null
        const shengenSegments = segments.filter(it => it.isShengenRegion)
        
        if (!shengenSegments.length) return null
        
        const { startDate, endDate, totalDays } = calculateTotalDays(
            shengenSegments[0].startDate,
            shengenSegments[shengenSegments.length - 1].endDate,
        )
        const remainingDays = 89 - totalDays
        
        return {
            startDate,
            endDate,
            isOver: remainingDays < 0,
            totalDays,
            remainingDays,
        }
    }, [segments])
    
    const summaryTripText = useMemo(() => {
        if (!trip || !currentPlan || !segments?.length) return ''
        return segments.map(it => `${it.name} from ${it.startDate} to ${it.endDate}`).join('\n')
    }, [trip, currentPlan, segments])
    
    const updateTrip = useCallback(field => async e => {
        const value = e?.target?.value ?? e
        
        updateTripMutation.mutate({ tripId, [field]: value }, {
            onSuccess: () => {
                toast('Trip updated')
                queryClient.invalidateQueries(['trip', tripId])
            },
        })
    }, [tripId, updateTripMutation, queryClient])
    
    const addSegment = useCallback(async () => {
        if (!currentPlan) return
        const newSegment = {
            planId: currentPlan.id,
            name: 'New Segment',
            startDate: dayjs().format('YYYY-MM-DD'),
            endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
        }
        
        addSegmentMutation.mutate(newSegment, {
            onSuccess: () => {
                toast('Segment added')
                queryClient.invalidateQueries(['trip', tripId])
            },
        })
    }, [currentPlan, addSegmentMutation, queryClient, tripId])
    
    const updateSegment = useCallback((id, field) => async e => {
        const value = e?.target?.value ?? e
        
        updateSegmentMutation.mutate({ segmentId: id, [field]: value }, {
            onSuccess: () => {
                toast('Segment updated')
                queryClient.invalidateQueries(['trip', tripId])
            },
        })
    }, [updateSegmentMutation, queryClient, tripId])
    
    const deleteSegments = useCallback(async ids => {
        deleteSegmentsMutation.mutate(ids, {
            onSuccess: () => {
                toast(`Segment${ids.length > 1 ? 's' : ''} deleted`)
                queryClient.invalidateQueries(['trip', tripId])
            },
        })
    }, [deleteSegmentsMutation, queryClient, tripId])
    
    const getTotalDaysPerSegment = segment => {
        if (!segment.startDate || !segment.endDate) return 0
        return dayjs(segment.endDate).diff(dayjs(segment.startDate), 'day')
    }
    
    const totalDaysPerSegmentByIndex = useMemo(() => segments
        ?.map(it => getTotalDaysPerSegment(it)) || [], [segments])
    
    const getCumulativeDaysPerSegment = useCallback(index => (
        totalDaysPerSegmentByIndex
            .slice(0, index + 1)
            .reduce((acc, it) => acc + it, 0)
    ), [totalDaysPerSegmentByIndex])
    
    const backupTrip = useCallback(async () => {
        // This should probably be a mutation as well
        console.log('backupTrip')
        toast('Backup not implemented yet')
    }, [trip])
    
    const clonePlan = useCallback(async () => {
        if (!currentPlan) return toast.error('No plan selected to clone')
        clonePlanMutation.mutate({ planId: currentPlan.id }, {
            onSuccess: newPlan => {
                toast('Plan cloned')
                queryClient.invalidateQueries(['trip', tripId])
                router.push(`/trips/${tripId}/plans/${newPlan.id}`)
            },
        })
    }, [clonePlanMutation, currentPlan, queryClient, tripId, router])
    
    const renamePlan = useCallback(async planId => {
        const newName = prompt('Enter a new plan name:')
        
        if (!newName?.trim()) return
        renamePlanMutation.mutate({ planId, name: newName }, {
            onSuccess: () => {
                toast('Plan renamed')
                queryClient.invalidateQueries(['trip', tripId])
            },
        })
    }, [renamePlanMutation, queryClient, tripId])
    
    const deletePlan = useCallback(async planId => {
        if (confirm('Are you sure you want to delete this plan?')) {
            deletePlanMutation.mutate({ planId }, {
                onSuccess: () => {
                    toast('Plan deleted')
                    queryClient.invalidateQueries(['trip', tripId])
                    router.push(`/trips/${tripId}`)
                },
            })
        }
    }, [deletePlanMutation, queryClient, tripId, router])
    
    useEffect(() => {
        if (!planId && tripId && plans?.length) {
            router.replace(`/trips/${tripId}/plans/${plans[0].id}`)
        }
    }, [tripId, planId, plans, router])
    
    return {
        // State
        tripId,
        planId,
        isEditingName,
        setIsEditingName,
        focusedLatLng,
        setFocusedLatLng,
        
        // Global State
        trip,
        currentTrip: trip,
        currentPlan,
        plans,
        segments,
        cascadeEnabled,
        setCascadeEnabled,
        showMap,
        setShowMap,
        
        // Memos
        shengenData,
        summaryTripText,
        totalDaysPerSegmentByIndex,
        
        // Hooks
        navigate: router.push,
        
        // Actions
        updateTrip,
        addSegment,
        updateSegment,
        deleteSegments,
        getTotalDaysPerSegment,
        getCumulativeDaysPerSegment,
        backupTrip,
        clonePlan,
        renamePlan,
        deletePlan,
        
        // Loading/error states
        isLoading: tripIsLoading,
        error: tripError,
    }
}

export default useTripDetailViewModel
