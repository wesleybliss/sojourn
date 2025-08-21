import { useState, useMemo, useCallback, useEffect } from 'react'
import { useWireState } from '@forminator/react-wire'
import * as store from '@/store'
import * as actions from '@/actions'
import { useLiveQuery } from 'dexie-react-hooks'
import tripsRepo from '@/db/repositories/trips'
import plansRepo from '@/db/repositories/plans'
import segmentsRepo from '@/db/repositories/segments'
import { useParams, useNavigate } from 'react-router-dom'
import { postEvent } from '@/lib/eventBus'
import { EVENT_CREATE_SEGMENT } from '@/constants'
import dayjs from 'dayjs'
import { toast } from 'sonner'
import { calculateTotalDays } from '@/lib/utils.js'

const useTripViewModel = () => {
    
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
    
    const currentTrip = useLiveQuery(() => tripId ? tripsRepo.getById(tripId) : null, [tripId])
    const currentPlan = useLiveQuery(() => planId ? plansRepo.getById(planId) : null, [planId])
    
    const plans = useLiveQuery(() => tripId ? (
        plansRepo.table
            .where('tripId')
            .equals(tripId)
            // .reverse()
            .sortBy('createdAt')
    ) : null, [tripId])
    
    const segments = useLiveQuery(() => planId ? (
        segmentsRepo.table
            .where('planId')
            .equals(planId)
            // .reverse()
            .sortBy('startDate')
    ) : null, [planId])
    
    const shengenData = useMemo(() => {
        
        if (!segments?.length) return
        
        const shengenSegments = segments.filter(it => it.isShengenRegion)
        
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
        
        const value = e?.target?.value ?? e // Use nullish coalescing
        
        console.log('updateTrip', field, value)
        
        await tripsRepo.update(currentTrip.id, {
            [field]: value,
        })
        
        toast('Trip updated')
        
    }, [currentTrip])
    
    const addSegment = useCallback(async () => {
        
        if (!currentTrip) return
        
        postEvent(EVENT_CREATE_SEGMENT)
        
    }, [currentTrip, segments])
    
    const updateSegment = useCallback((id, field) => async e => {
        
        console.log('updateSegment', { currentTrip, planId, segmentsLen: segments?.length })
        
        if (!currentTrip || !planId || !segments) return
        
        const value = e?.target?.value ?? e // Use nullish coalescing
        
        console.log('updateSegment', field, value)
        
        await actions.updateSegmentWithCascade(currentTrip, planId, id, field, value, cascadeEnabled)
        
    }, [currentTrip, planId, segments, cascadeEnabled])
    
    const deleteSegments = useCallback(async ids => {
        
        if (!Array.isArray(ids) || ids.length <= 0)
            throw new Error('Param "ids" must be an array')
        
        console.log('deleteSegments', ids)
        
        await Promise.all(ids.map(it => segmentsRepo.delete(it)))
        
        toast(`Segment${ids.length > 0 ? 's' : ''} deleted`)
        
    }, [segmentsRepo])
    
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
        
    }, [currentTrip])
    
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
            await plansRepo.update(planId, { name: newName })
            toast('Plan renamed')
        } catch (e) {
            console.error('renamePlan', e)
            toast('Failed to rename plan')
        }
        
    })
    
    const deletePlan = useCallback(async planId => {
        
        let plan = null
        
        try {
            plan = await plansRepo.getById(planId)
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
        
        try {
            await actions.deletePlan(plan.id)
            toast('Plan deleted')
            setTimeout(() => navigate(`/trips/${tripId}`), 500)
        } catch (e) {
            console.error('deletePlan', e)
            toast('Failed to delete plan')
        }
        
    }, [])
    
    useEffect(() => {
        
        setCurrentTripId(tripId)
        setCurrentPlanId(planId)
        
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
        
        setCurrentPlanId(planId)
        
        return () => setCurrentPlanId(null)
        
    }, [tripId, planId, plans])
    
    useEffect(() => {
        
        if (focusedLatLng) return
        if (!segments?.length) return
        
        if (segments[0].coords) {
            setFocusedLatLng(segments[0].coords)
            console.log('Updated map ' + segments[0].coords)
            toast(`Updated map ${segments[0].coords.lng},${segments[0].coords.lat}`)
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
        // setCurrentTrip,
        currentPlan,
        currentPlanId,
        // setCurrentPlanId,
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
