import { useState, useMemo, useCallback, useEffect } from 'react'
import { useWireState } from '@forminator/react-wire'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as store from '@/store'
import * as actions from '@/actions'
import { useParams, useNavigate } from 'react-router-dom'
import { postEvent } from '@/lib/eventBus'
import { EVENT_CREATE_SEGMENT } from '@/constants'
import dayjs from 'dayjs'
import { toast } from 'sonner'
import { calculateTotalDays } from '@/lib/utils.js'
import {
    getTripById,
    getPlanById,
    getPlansByTripId,
    getSegmentsByPlanId,
    updateTrip as updateTripApi,
    updatePlan as updatePlanApi,
    deleteSegments as deleteSegmentsApi,
    deletePlan as deletePlanApi,
} from '@/lib/api/tripQueries'

const useTripViewModel = () => {
    const queryClient = useQueryClient()
    const params = useParams()
    const navigate = useNavigate()
    
    const tripId = params?.tripId || ''
    const planId = params?.planId || ''
    
    const [isEditingName, setIsEditingName] = useState(false)
    const [focusedLatLng, setFocusedLatLng] = useState(undefined)
    const [shengenStartDate, setShengenStartDate] = useState(new Date()) // @todo refactor
    const [shengenEndDate, setShengenEndDate] = useState(dayjs(new Date()).add(89, 'day').toDate()) // @todo refactor
    
    const [currentTripId, setCurrentTripId] = useWireState(store.currentTripId)
    const [currentPlanId, setCurrentPlanId] = useWireState(store.currentPlanId)
    const [cascadeEnabled, setCascadeEnabled] = useWireState(store.cascadeEnabled)
    const [showMap, setShowMap] = useWireState(store.showMap)
    
    const { data: currentTrip } = useQuery({
        queryKey: ['trip', tripId],
        queryFn: () => tripId ? getTripById(parseInt(tripId, 10)) : null,
        enabled: !!tripId,
    })
    
    const { data: currentPlan } = useQuery({
        queryKey: ['plan', planId],
        queryFn: () => planId ? getPlanById(parseInt(planId, 10)) : null,
        enabled: !!planId,
    })
    
    const { data: plans } = useQuery({
        queryKey: ['plans', tripId],
        queryFn: () => tripId ? getPlansByTripId(parseInt(tripId, 10)) : null,
        enabled: !!tripId,
    })
    
    const { data: segments } = useQuery({
        queryKey: ['segments', planId],
        queryFn: () => planId ? getSegmentsByPlanId(parseInt(planId, 10)) : null,
        enabled: !!planId,
    })
    
    // Mutations
    const updateTripMutation = useMutation({
        mutationFn: ({ id, data }) => updateTripApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trip', tripId] })
            toast('Trip updated')
        },
        onError: error => {
            console.error('Error updating trip:', error)
            toast('Failed to update trip')
        },
    })
    
    const updatePlanMutation = useMutation({
        mutationFn: ({ id, data }) => updatePlanApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plan', planId] })
            queryClient.invalidateQueries({ queryKey: ['plans', tripId] })
            toast('Plan updated')
        },
        onError: error => {
            console.error('Error updating plan:', error)
            toast('Failed to update plan')
        },
    })
    
    const deleteSegmentsMutation = useMutation({
        mutationFn: ids => deleteSegmentsApi(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['segments', planId] })
            toast('Segments deleted')
        },
        onError: error => {
            console.error('Error deleting segments:', error)
            toast('Failed to delete segments')
        },
    })
    
    const deletePlanMutation = useMutation({
        mutationFn: id => deletePlanApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans', tripId] })
            toast('Plan deleted')
            setTimeout(() => navigate(`/trips/${tripId}`), 500)
        },
        onError: error => {
            console.error('Error deleting plan:', error)
            toast('Failed to delete plan')
        },
    })
    
    const shengenData = useMemo(() => {
        if (!segments?.length) return
        
        const shengenSegments = segments.filter(it => it.isShengenRegion)
        
        if (!shengenSegments.length) return
        
        const { startDate, endDate, totalDays } = calculateTotalDays(
            shengenSegments[0].startDate,
            shengenSegments[shengenSegments.length - 1].endDate)
        
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
        
        if (!currentTrip || !currentPlan || !segments?.length) return ''
        
        return segments.map(it => `${it.name} from ${it.startDate} to ${it.endDate}`).join('\n')
        
    }, [currentTrip, currentPlan, segments])
    
    const updateTrip = useCallback(field => async e => {
        
        if (!currentTrip) return
        
        const value = e?.target?.value ?? e
        
        console.log('updateTrip', field, value)
        
        await updateTripMutation.mutateAsync({
            id: currentTrip.id,
            data: { [field]: value },
        })
        
    }, [currentTrip, updateTripMutation])
    
    const addSegment = useCallback(async () => {
        
        if (!currentTrip) return
        
        postEvent(EVENT_CREATE_SEGMENT)
        
    }, [currentTrip])
    
    const updateSegment = useCallback((id, field) => async e => {
        
        if (!currentTrip || !planId || !segments) return
        
        const value = e?.target?.value ?? e
        
        console.log('updateSegment', field, value)
        
        await actions.updateSegmentWithCascade(currentTrip, planId, id, field, value, cascadeEnabled)
        
    }, [currentTrip, planId, segments, cascadeEnabled])
    
    const deleteSegments = useCallback(async ids => {
        if (!Array.isArray(ids) || ids.length <= 0)
            throw new Error('Param "ids" must be an array')
        
        console.log('deleteSegments', ids)
        await deleteSegmentsMutation.mutateAsync(ids)
    }, [deleteSegmentsMutation])
    
    const getTotalDaysPerSegment = segment => {
        const startDate = new Date(segment.startDate)
        const endDate = new Date(segment.endDate)
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        return diffDays
    }
    
    const totalDaysPerSegmentByIndex = useMemo(() => segments
        ?.map(it => getTotalDaysPerSegment(it)) || [], [segments])
    
    const getCumulativeDaysPerSegment = useCallback(index => (
        totalDaysPerSegmentByIndex
            .slice(0, index + 1)
            .reduce((acc, it) => acc + it, 0)
    ), [totalDaysPerSegmentByIndex])
    
    const backupTrip = useCallback(async () => {
        await actions.backupTrip(currentTrip)
    }, [currentTrip, segments])
    
    const clonePlan = useCallback(async () => {
        if (!planId)
            return toast('No current plan to clone')
        
        await actions.clonePlan(planId)
    }, [planId])
    
    const renamePlan = useCallback(async planId => {
        const newName = prompt('Enter a new plan name:')
        
        if (!newName?.trim()?.length)
            return console.warn('renamePlan: no new name given')
        
        try {
            await updatePlanMutation.mutateAsync({
                id: planId,
                data: { name: newName },
            })
            toast('Plan renamed')
        } catch (e) {
            console.error('renamePlan', e)
            toast('Failed to rename plan')
        }
    }, [updatePlanMutation])
    
    const deletePlan = useCallback(async planId => {
        let plan = null
        
        try {
            plan = await getPlanById(planId)
        } catch (e) {
            console.error('deletePlan', e)
            return toast('Failed to find plan')
        }
        
        if (!plan)
            return console.warn('deletePlan: no current plan')
        
        let conf = confirm(`Are you sure you want to delete plan "${plan.name}"?`)
        if (!conf) return
        
        conf = confirm('Are you really sure?')
        if (!conf) return
        
        await deletePlanMutation.mutateAsync(planId)
    }, [deletePlanMutation])
    
    useEffect(() => {
        
        setCurrentTripId(parseInt(tripId, 10))
        setCurrentPlanId(parseInt(planId, 10))
        
        return () => {
            setCurrentTripId(null)
            setCurrentPlanId(null)
        }
    }, [tripId, planId])
    
    useEffect(() => {
        if (!segments?.length) return
        
        const value = dayjs(segments[0].startDate)
        setShengenStartDate(value.toDate())
        setShengenEndDate(value.add(89, 'day').toDate())
    }, [segments])
    
    useEffect(() => {
        // Default to the first plan, if none selected
        if (!planId && tripId && plans?.length) {
            console.log('Redirecting to plan:', plans[0].name)
            setCurrentPlanId(plans[0].id)
            setTimeout(() => navigate(`/trips/${tripId}/plans/${plans[0].id}`), 500)
            return
        }
        
        setCurrentPlanId(parseInt(planId, 10))
        
        return () => setCurrentPlanId(null)
    }, [tripId, planId, plans])
    
    useEffect(() => {
        if (focusedLatLng) return
        if (!segments?.length) return
        
        if (segments[0].coordsLat && segments[0].coordsLng) {
            const coords = { lat: segments[0].coordsLat, lng: segments[0].coordsLng }
            setFocusedLatLng(coords)
            console.log('Updated map ' + coords)
            toast(`Updated map ${coords.lng},${coords.lat}`)
        }
    }, [focusedLatLng, segments])
    
    return {
        // State
        tripId,
        planId,
        isEditingName,
        setIsEditingName,
        focusedLatLng,
        setFocusedLatLng,
        
        shengenStartDate,
        shengenEndDate,
        
        // Global State
        currentTrip,
        currentTripId,
        currentPlan,
        currentPlanId,
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
        navigate,
        
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
    }
}

export default useTripViewModel
