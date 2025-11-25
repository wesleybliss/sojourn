import { useState, useMemo, useCallback, useEffect } from 'react'
import { useWire, useWireState, useWireValue } from '@forminator/react-wire'
import * as store from '@/store'
import { useParams, useRouter } from 'next/navigation'
import {
    useTripQuery,
    useUpdateTrip,
    useAddSegment,
    useUpdateSegment,
    useDeleteSegments,
    useRenamePlan,
    useDeletePlan,
} from '@/lib/queries/trip.js'
import { useQueryClient } from '@tanstack/react-query'
import { useBackupTrips } from '@/lib/queries/backups'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import { sortArrByUpdatedAt } from '@/lib/utils.js'

const matchesDate = (date, query) => {
    
    const q = query?.toLowerCase()
    const d1 = dayjs(date).format().toLowerCase()
    const d2 = dayjs(date).format('MMMM DD, YYYY').toLowerCase()
    
    return d1.includes(q) || d2.includes(q)
    
}

const useTripEditorViewModel = () => {
    
    const params = useParams()
    const router = useRouter()
    const queryClient = useQueryClient()
    
    const { tripId, planId } = params
    
    const { data: trip, error: tripError, isLoading: tripIsLoading } = useTripQuery(tripId)
    
    // Mutations
    const updateTripMutation = useUpdateTrip()
    const backupMutation = useBackupTrips()
    const addSegmentMutation = useAddSegment()
    const updateSegmentMutation = useUpdateSegment()
    const deleteSegmentsMutation = useDeleteSegments()
    const renamePlanMutation = useRenamePlan()
    const deletePlanMutation = useDeletePlan()
    
    const [isLoadingInitial, setIsLoadingInitial] = useState(true)
    const [isEditingName, setIsEditingName] = useState(false)
    const [focusedLatLng, setFocusedLatLng] = useState(undefined)
    const [cascadeEnabled, setCascadeEnabled] = useState(false)
    const [hasRedirectedToPlan, setHasRedirectedToPlan] = useState(false)
    const [segmentsFilterQuery, setSegmentsFilterQuery] = useState('')
    const [segmentsListShowCompleted, setSegmentsListShowCompleted] = useState(false)
    const [segmentsListViewMode, setSegmentsListViewMode] = useState('list')
    
    const [showMap, setShowMap] = useWireState(store.showMap)
    const [isTripEditMode, setIsTripEditMode] = useWireState(store.isTripEditMode)
    
    const trips = useWireValue(store.trips)
    const currentTripId = useWire(store.currentTripId)
    const plans = useWireValue(store.currentPlans)
    const currentPlanId = useWire(store.currentPlanId)
    const currentPlan = useWireValue(store.currentPlan)
    const segments = useWireValue(store.currentSegments)
    const shengenData = useWireValue(store.shengenData)
    
    const isLoading = useMemo(() => (
        isLoadingInitial || tripIsLoading
    ), [isLoadingInitial, tripIsLoading])
    
    const filteredSegments = useMemo(() => {
        
        if (!segmentsFilterQuery?.length || !segments?.length)
            return segments
        
        return segments?.filter(it => {
            
            const query = segmentsFilterQuery.toLowerCase()
            const matchesName = it.name.toLowerCase().includes(query)
            const matchesStartDate = matchesDate(it.startDate, query)
            const matchesEndDate = matchesDate(it.endDate, query)
            
            return matchesName || matchesStartDate || matchesEndDate
            
        }) || []
        
    }, [segments, segmentsFilterQuery])
    
    const summaryTripText = useMemo(() => {
        
        if (!trip || !currentPlan || !segments?.length) return ''
        
        return segments
            .map(it => `${it.name} from ${it.startDate} to ${it.endDate}`)
            .join('\n')
        
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
        
        console.log('updateSegment', { trip, planId, segmentsLen: segments?.length })
        
        if (!trip || !planId || !segments)
            return console.warn('updateSegment: no current trip or plan')
        
        const value = e?.target?.value ?? e // Use nullish coalescing
        
        console.log('updateSegment', { planId, id, field, value, cascadeEnabled })
        
        const payload = {
            segmentId: id, [field]: value,
            cascadeEnabled,
        }
        
        updateSegmentMutation.mutate(payload, {
            onSuccess: () => {
                toast('Segment updated')
                queryClient.invalidateQueries(['trip', tripId])
            },
        })
        
    }, [trip, tripId, planId, segments, updateSegmentMutation, queryClient, cascadeEnabled])
    
    const deleteSegments = useCallback(async ids => {
        
        deleteSegmentsMutation.mutate({
            tripId,
            planId,
            segmentIds: ids,
        }, {
            onSuccess: () => {
                toast(`Segment${ids.length > 1 ? 's' : ''} deleted`)
                queryClient.invalidateQueries(['trip', tripId])
            },
        })
        
    }, [deleteSegmentsMutation, queryClient, tripId, planId])
    
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
    
    // If the segment has both flight and stay booked, it's considered planned
    const getSegmentPlanned = useCallback(segment => (segment.flightBooked && segment.stayBooked), [])
    
    // If the segment end date has elapsed
    const getSegmentCompleted = useCallback(segment => dayjs().isAfter(dayjs(segment.endDate)), [])
    
    const backupTrip = useCallback(async () => {
        
        try {
            await backupMutation.mutateAsync({ type: 'single', tripId: [tripId] })
            toast.success('Backup file downloaded')
        } catch (error) {
            console.error('Error creating backup:', error)
            toast.error('Failed to create backup')
        }
        
    }, [tripId])
    
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
        
        if (!confirm('Are you sure you want to delete this plan?'))
            return
        
        deletePlanMutation.mutate({ planId }, {
            onSuccess: () => {
                toast('Plan deleted')
                queryClient.invalidateQueries(['trip', tripId])
                router.push(`/trips/${tripId}`)
            },
        })
        
    }, [deletePlanMutation, queryClient, tripId, router])
    
    useEffect(() => {
        
        setIsLoadingInitial(true)
        
        if (!planId && tripId && plans?.length && !hasRedirectedToPlan) {
            
            const latestPlan = sortArrByUpdatedAt(plans)?.[0] || plans[0]
            
            setHasRedirectedToPlan(true)
            router.replace(`/trips/${tripId}/plans/${latestPlan.id}`)
            
        } else {
            
            setIsLoadingInitial(false)
            
        }
        
    }, [tripId, planId, plans, router, hasRedirectedToPlan])
    
    useEffect(() => {
        
        const nextTrip = tripId
            ? trips.find(t => t.id.toString() === tripId)
            : trips?.[0]
        
        if (nextTrip)
            currentTripId.setValue(nextTrip.id)
        
        const nextPlan = planId
            ? plans.find(p => p.id.toString() === planId)
            : plans?.[0]
        
        if (nextPlan)
            currentPlanId.setValue(nextPlan.id)
        
    }, [trips, tripId, plans, planId])
    
    useEffect(() => {
        
        if (focusedLatLng) return
        if (!segments?.length) return
        
        if (segments[0].coordsLat && segments[0].coordsLat) {
            
            const coords = {
                lat: segments[0].coordsLat,
                lng: segments[0].coordsLng,
            }
            
            setFocusedLatLng(coords)
            
            console.log('Updated map ' + coords)
            // toast(`Updated map ${coords.lng},${coords.lat}`)
            
        }
        
    }, [focusedLatLng, segments])
    
    return {
        
        // State
        isLoadingInitial,
        setIsLoadingInitial,
        tripId,
        planId,
        isEditingName,
        setIsEditingName,
        focusedLatLng,
        setFocusedLatLng,
        segmentsFilterQuery,
        setSegmentsFilterQuery,
        segmentsListViewMode,
        setSegmentsListViewMode,
        segmentsListShowCompleted,
        setSegmentsListShowCompleted,
        
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
        isTripEditMode,
        setIsTripEditMode,
        
        // Memos
        filteredSegments,
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
        getSegmentPlanned,
        getSegmentCompleted,
        backupTrip,
        renamePlan,
        deletePlan,
        
        // Loading/error states
        isLoading,
        error: tripError,
    }
}

export default useTripEditorViewModel
