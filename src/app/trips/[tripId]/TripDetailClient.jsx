'use client'

import { useState, useMemo, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useTripQuery from '@/lib/queries/trip'
import TripHeader from '@/components/TripHeader'
import SegmentsTable from '@/components/SegmentsTable'
import SegmentsGanttChart from '@/components/SegmentsGanttChart'
import MapLibreMap from '@/components/MapLibreMap'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { MapPinPlus, ChevronsUpDown } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { toast } from 'sonner'
import { calculateTotalDays } from '@/lib/utils.js'
import dayjs from 'dayjs'

export default function TripDetailClient() {
    
    const params = useParams()
    const router = useRouter()
    
    const { tripId } = params
    
    const {
        data: trip,
        error: tripError,
        isLoading: tripIsLoading,
    } = useTripQuery(tripId)
    
    const [showMap, setShowMap] = useState(false)
    const [cascadeEnabled, setCascadeEnabled] = useState(false)
    const [focusedLatLng, setFocusedLatLng] = useState(undefined)
    const [isDebugOpen, setIsDebugOpen] = useState(false)
    
    const plans = useMemo(() => trip?.plans || [{ id: 1, name: 'Plan #1', tripId: trip?.id }])
    const currentPlan = plans[0]
    const segments = useMemo(() => currentPlan?.segments || [], [currentPlan])
    
    // Schengen data calculation (from original ViewModel)
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
    
    // Summary text for AI (from original ViewModel)
    const summaryTripText = useMemo(() => {
        if (!trip || !currentPlan || !segments?.length) return ''
        return segments.map(it => `${it.name} from ${it.startDate} to ${it.endDate}`).join('\n')
    }, [trip, currentPlan, segments])
    
    // Event handlers (simplified versions of original ViewModel methods)
    const updateTrip = useCallback(field => async e => {
        const value = e?.target?.value ?? e
        
        console.log('updateTrip', field, value)
        // TODO: Implement API call to update trip
        toast('Trip updated')
    }, [trip])
    
    const addSegment = useCallback(async (tripId, segmentData) => {
        console.log('Adding segment:', segmentData)
        // TODO: Implement API call to add segment
        toast('Segment added')
    }, [])
    
    const updateSegment = useCallback((segment, field) => async e => {
        const value = e?.target?.value ?? e
        
        console.log('updateSegment', segment.id, field, value)
        // TODO: Implement API call to update segment
        toast('Segment updated')
    }, [])
    
    const deleteSegments = useCallback(async segmentIds => {
        console.log('Deleting segments:', segmentIds)
        // TODO: Implement API call to delete segments
        toast('Segments deleted')
    }, [])
    
    const getTotalDaysPerSegment = useCallback(segment => {
        if (!segment.startDate || !segment.endDate) return 0
        return dayjs(segment.endDate).diff(dayjs(segment.startDate), 'day')
    }, [])
    
    const getCumulativeDaysPerSegment = useCallback(segment => {
        // TODO: Implement cumulative days calculation
        return 0
    }, [])
    
    const backupTrip = useCallback(() => {
        console.log('Backing up trip')
        toast('Trip backup created')
    }, [trip])
    
    const navigate = useCallback(path => {
        router.push(path)
    }, [router])
    
    const renamePlan = useCallback(planId => {
        console.log('Renaming plan:', planId)
        toast('Plan rename not implemented')
    }, [])
    
    const deletePlan = useCallback(planId => {
        console.log('Deleting plan:', planId)
        toast('Plan delete not implemented')
    }, [])
    
    const clonePlan = useCallback(() => {
        console.log('Cloning plan')
        toast('Plan clone not implemented')
    }, [])
    
    // Create view model object to match original structure
    const vm = {
        currentTrip: trip,
        currentPlan,
        segments,
        plans,
        planId: currentPlan?.id,
        cascadeEnabled,
        setCascadeEnabled,
        showMap,
        setShowMap,
        focusedLatLng,
        shengenData,
        summaryTripText,
        updateTrip,
        addSegment,
        updateSegment,
        deleteSegments,
        getTotalDaysPerSegment,
        getCumulativeDaysPerSegment,
        backupTrip,
        navigate,
        renamePlan,
        deletePlan,
        clonePlan,
    }
    
    if (!trip) {
        return <p>Loading...</p>
    }
    
    return (
        <div className="Trip w-full flex flex-col flex-1 gap-4 p-4">
            <TripHeader vm={vm} />
            
            <header className="flex items-center justify-between">
                <h3>Segments: {segments?.length || '0'}</h3>
                <div className="flex items-center justify-end gap-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="toggle-cascade"
                            checked={cascadeEnabled}
                            onCheckedChange={setCascadeEnabled}/>
                        <Label htmlFor="toggle-cascade">Cascade</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="toggle-map"
                            checked={showMap}
                            onCheckedChange={setShowMap}/>
                        <Label htmlFor="toggle-map">Show Map</Label>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => addSegment(trip.id, {
                            name: 'New segment',
                            description: 'New segment description',
                        })}>
                        <MapPinPlus />
                        New Segment
                    </Button>
                </div>
            </header>
            
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2 w-fit">
                    {trip && segments?.length <= 0 && (
                        <p>You have no segments yet.</p>
                    )}
                    {segments?.length > 0 && (
                        <SegmentsTable
                            segments={segments}
                            updateSegment={updateSegment}
                            deleteSegments={deleteSegments}
                            getTotalDaysPerSegment={getTotalDaysPerSegment}
                            getCumulativeDaysPerSegment={getCumulativeDaysPerSegment}/>
                    )}
                </div>
                {showMap && <MapLibreMap latLng={focusedLatLng} />}
            </div>
            
            {trip && segments?.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Timeline</h3>
                    <SegmentsGanttChart plan={currentPlan} />
                </div>
            )}
            
            {/* Debug: Show if segments exist but gantt not rendering */}
            {trip && segments?.length === 0 && (
                <div className="mt-4 p-4 border rounded bg-yellow-50">
                    <p>No segments available for Gantt chart</p>
                </div>
            )}
            
            {/* Always show for debugging */}
            <div className="mt-4 p-2 text-xs text-gray-500">
                Debug: Trip ID: {trip?.id}, Segments: {segments?.length || 0}, Plan ID: {currentPlan?.id}
            </div>
            
            <div className="flex-1">&nbsp;</div>
            
            <Collapsible
                open={isDebugOpen}
                onOpenChange={setIsDebugOpen}
                className="w-full space-y-2">
                <div className="w-[350px] flex items-center justify-between space-x-4 px-4">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <h4 className="text-sm font-semibold">Trip Debug</h4>
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                    <div>
                        <pre>
                            <code className="text-sm">
                                {JSON.stringify({ trip, segments }, null, 4)}
                            </code>
                        </pre>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}
