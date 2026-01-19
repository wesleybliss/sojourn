import { useState, useMemo, useCallback, useEffect } from 'react'
import { useWireState } from '@forminator/react-wire'
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
} from '@/lib/queries/trip'
import { useShufflePlaceCoverPhoto } from '@/lib/queries/places'
import { useBackupTrips } from '@/lib/queries/backups'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import { sortArrByUpdatedAt, calculateTotalDays } from '@/lib/utils'
import { useUpdatePlan } from '@/lib/queries/plans'
import { useUpdatePlace } from '@/lib/queries/places'

const matchesDate = (date, query) => {
    
    const q = query?.toLowerCase()
    const d1 = dayjs(date).format().toLowerCase()
    const d2 = dayjs(date).format('MMMM DD, YYYY').toLowerCase()
    
    return d1.includes(q) || d2.includes(q)
    
}

const useTripEditorViewModel = () => {
    
    const params = useParams()
    const router = useRouter()
    const { tripId, planId } = params
    
    // React Query is the single source of truth for trip/plans/segments
    const {
        data: trip,
        error: tripError,
        isLoading: tripIsLoading,
        isFetching: tripIsFetching,
    } = useTripQuery(tripId)
    
    // Derive plans/currentPlan/segments directly from the React Query trip data
    // This eliminates the "split brain" issue between React Query and wire store
    const plans = useMemo(() => trip?.plans || [], [trip])
    
    const currentPlan = useMemo(() => {
        if (!plans.length) return null
        
        if (planId) {
            const found = plans.find(p => p.id.toString() === planId.toString())
            
            if (found) return found
        }
        
        // Fall back to first plan if planId doesn't match
        return plans[0] || null
    }, [plans, planId])
    
    const segments = useMemo(() => currentPlan?.segments || [], [currentPlan])
    
    // Compute shengenData locally instead of from wire selector
    const shengenData = useMemo(() => {
        const shengenSegments = segments?.filter(it => it.isShengenRegion) || []
        
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
    
    // Mutations
    const updateTripMutation = useUpdateTrip()
    const backupMutation = useBackupTrips()
    const addSegmentMutation = useAddSegment()
    const updateSegmentMutation = useUpdateSegment()
    const deleteSegmentsMutation = useDeleteSegments()
    const renamePlanMutation = useRenamePlan()
    const deletePlanMutation = useDeletePlan()
    const updatePlanMutation = useUpdatePlan()
    const updatePlace = useUpdatePlace()
    const shufflePlaceCoverPhotoMutation = useShufflePlaceCoverPhoto()
    
    const [isLoadingInitial, setIsLoadingInitial] = useState(true)
    const [isEditingName, setIsEditingName] = useState(false)
    const [focusedLatLng, setFocusedLatLng] = useState(undefined)
    const [cascadeEnabled, setCascadeEnabled] = useState(false)
    const [hasRedirectedToPlan, setHasRedirectedToPlan] = useState(false)
    const [segmentsFilterQuery, setSegmentsFilterQuery] = useState('')
    const [segmentsListShowCompleted, setSegmentsListShowCompleted] = useState(false)
    const [segmentsListViewMode, setSegmentsListViewMode] = useState('list')
    
    // Wire store is only used for UI preferences, not entity data
    const [showMap, setShowMap] = useWireState(store.showMap)
    const [isTripEditMode, setIsTripEditMode] = useWireState(store.isTripEditMode)
    
    const isLoading = useMemo(() => (
        isLoadingInitial || tripIsLoading
    ), [isLoadingInitial, tripIsLoading])
    
    const filteredSegments = useMemo(() => {
        
        if (!segments?.length) return []
        
        let result = segments
        
        // Filter by completion status (hide past segments unless showCompleted is true)
        if (!segmentsListShowCompleted) {
            result = result.filter(it => dayjs(it.endDate).isAfter(dayjs()))
        }
        
        // Filter by search query
        if (segmentsFilterQuery?.length) {
            const query = segmentsFilterQuery.toLowerCase()
            
            result = result.filter(it => {
                const matchesName = it.name.toLowerCase().includes(query)
                const matchesStartDate = matchesDate(it.startDate, query)
                const matchesEndDate = matchesDate(it.endDate, query)
                
                return matchesName || matchesStartDate || matchesEndDate
            })
        }
        
        return result
        
    }, [segments, segmentsFilterQuery, segmentsListShowCompleted])
    
    const summaryTripText = useMemo(() => {
        
        if (!trip || !currentPlan || !segments?.length) return ''
        
        return segments
            .map(it => `${it.name} from ${it.startDate} to ${it.endDate}`)
            .join('\n')
        
    }, [trip, currentPlan, segments])
    
    const updateTrip = useCallback(field => async e => {
        
        const value = e?.target?.value ?? e
        
        // Mutation hook handles invalidation
        updateTripMutation.mutate({ tripId, [field]: value }, {
            onSuccess: () => toast('Trip updated'),
        })
        
    }, [tripId, updateTripMutation])
    
    const addSegment = useCallback(async () => {
        
        if (!currentPlan || !tripId) return
        
        // Find the segment with the furthest end date to use as the new segment's start
        let startDate = dayjs()
        
        if (segments?.length) {
            const lastSegment = segments.reduce((latest, seg) =>
                dayjs(seg.endDate).isAfter(dayjs(latest.endDate)) ? seg : latest,
            )
            
            startDate = dayjs(lastSegment.endDate)
        }
        
        const newSegment = {
            tripId,
            planId: currentPlan.id,
            name: 'New Segment',
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: startDate.add(1, 'day').format('YYYY-MM-DD'),
        }
        
        // Mutation hook handles invalidation
        addSegmentMutation.mutate(newSegment, {
            onSuccess: () => toast('Segment added'),
        })
        
    }, [currentPlan, tripId, segments, addSegmentMutation])
    
    const updateSegment = useCallback((id, field) => async e => {
        
        if (!trip || !currentPlan)
            return console.warn('updateSegment: no current trip or plan')
        
        const value = e?.target?.value ?? e
        
        const payload = {
            segmentId: id,
            tripId,
            planId: currentPlan.id,
            [field]: value,
            cascadeEnabled,
        }
        
        // Mutation hook handles optimistic updates and invalidation
        updateSegmentMutation.mutate(payload, {
            onSuccess: () => toast('Segment updated'),
        })
        
    }, [trip, tripId, currentPlan, updateSegmentMutation, cascadeEnabled])
    
    const deleteSegments = useCallback(async ids => {
        
        if (!currentPlan) return
        
        // Mutation hook handles invalidation
        deleteSegmentsMutation.mutate({
            tripId,
            planId: currentPlan.id,
            segmentIds: ids,
        }, {
            onSuccess: () => toast(`Segment${ids.length > 1 ? 's' : ''} deleted`),
        })
        
    }, [deleteSegmentsMutation, tripId, currentPlan])
    
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
    
    const renamePlan = useCallback(async planIdToRename => {
        
        const newName = prompt('Enter a new plan name:')
        
        if (!newName?.trim()) return
        
        // Mutation hook handles invalidation
        renamePlanMutation.mutate({ planId: planIdToRename, name: newName }, {
            onSuccess: () => toast('Plan renamed'),
        })
        
    }, [renamePlanMutation])
    
    const deletePlan = useCallback(async planIdToDelete => {
        
        if (!confirm('Are you sure you want to delete this plan?'))
            return
        
        // Mutation hook handles invalidation
        deletePlanMutation.mutate({ planId: planIdToDelete }, {
            onSuccess: () => {
                toast('Plan deleted')
                router.push(`/trips/${tripId}`)
            },
        })
        
    }, [deletePlanMutation, tripId, router])
    
    const shufflePlaceCoverPhoto = useCallback(async (placeId, topic) => {
        
        if (!placeId || !topic?.length)
            return console.error('useTripEditorViewModel#shufflePlaceCoverPhoto missing params', { placeId, topic })
        
        console.log('useTripEditorViewModel#shufflePlaceCoverPhoto', placeId, topic)
        
        shufflePlaceCoverPhotoMutation.mutate({ topic }, {
            onSuccess: data => {
                console.log('shufflePlaceCoverPhoto', data)
                
                return updatePlace.mutate({ placeId, coverImageUrl: data.data }, {
                    onSuccess: () => {
                        toast('Place cover photo updated')
                    },
                    onError: e => {
                        console.error('Error updating place cover photo:', e)
                        toast.error('Failed to update place cover photo')
                    },
                })
            },
        })
        
    }, [shufflePlaceCoverPhotoMutation])
    
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
    
    // Sync trip/plan/segments to wire store for Navbar and other components that read from it
    useEffect(() => {
        
        if (trip) {
            store.currentTripId.setValue(trip.id)
        }
        
        if (currentPlan) {
            store.currentPlanId.setValue(currentPlan.id)
        }
        
    }, [trip, currentPlan])
    
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
        updatePlanMutation,
        shufflePlaceCoverPhoto,
        
        // Loading/error states
        isLoading,
        isFetching: tripIsFetching,
        error: tripError,
    }
}

export default useTripEditorViewModel
