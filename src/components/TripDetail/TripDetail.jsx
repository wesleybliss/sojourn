'use client'

import { useState } from 'react'
import SegmentsTable from '@/components/SegmentsTable.jsx'
import SegmentsGanttChart from '@/components/SegmentsGanttChart.jsx'
import MapLibreMap from '@/components/MapLibreMap.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { MapPinPlus, ChevronsUpDown, ClipboardPenLine } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible.jsx'
import LoadingSpinner from '@/components/LoadingSpinner.jsx'
import useTripDetailViewModel from '@/components/TripDetail/useTripDetailViewModel.js'
import CollapsibleTree from '@/components/CollapsibleTree.jsx'
import { getTripSegmentNames } from '@/lib/utils.js'
import { toast } from 'sonner'

const TripDetail = () => {
    
    const vm = useTripDetailViewModel()
    const [isDebugOpen, setIsDebugOpen] = useState(false)
    
    if (vm.isLoading)
        return <LoadingSpinner />
    
    if (vm.error)
        return <div>Error: {vm.error.message}</div>
    
    if (!vm.trip)
        return <LoadingSpinner />
    
    return (
        
        <div className="Trip w-full flex flex-col flex-1 gap-4 p-4">
            
            {/* <TripHeader vm={vm} /> */}
            
            <header className="flex items-center justify-between">
                <h3>Segments: {vm.segments?.length || '0'}</h3>
                <div className="flex items-center justify-end gap-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="toggle-cascade"
                            checked={vm.cascadeEnabled}
                            onCheckedChange={vm.setCascadeEnabled}/>
                        <Label htmlFor="toggle-cascade">Cascade</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="toggle-map"
                            checked={vm.showMap}
                            onCheckedChange={vm.setShowMap}/>
                        <Label htmlFor="toggle-map">Show Map</Label>
                    </div>
                    <Button
                        variant="outline"
                        onClick={vm.addSegment}>
                        <MapPinPlus />
                        New Segment
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            if (!vm.currentTrip)
                                return alert('No trip selected')
                            
                            getTripSegmentNames(vm.currentPlan)
                            toast.success('Segment names copied to clipboard')
                        }}>
                        <ClipboardPenLine />
                    </Button>
                </div>
            </header>
            
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2 w-fit">
                    {vm.trip && vm.segments?.length <= 0 && (
                        <p>You have no segments yet.</p>
                    )}
                    {vm.segments?.length > 0 && (
                        <SegmentsTable
                            segments={vm.segments}
                            updateSegment={vm.updateSegment}
                            deleteSegments={vm.deleteSegments}
                            getTotalDaysPerSegment={vm.getTotalDaysPerSegment}
                            getCumulativeDaysPerSegment={vm.getCumulativeDaysPerSegment} />
                    )}
                </div>
                {vm.showMap && <MapLibreMap latLng={console.log('latln', vm.focusedLatLng)||vm.focusedLatLng} />}
            </div>
            
            {vm.trip && vm.segments?.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Timeline</h3>
                    <SegmentsGanttChart plan={vm.currentPlan} />
                </div>
            )}
            
            {/* Debug: Show if segments exist but gantt not rendering */}
            {vm.trip && vm.segments?.length === 0 && (
                <div className="mt-4 p-4 border rounded bg-yellow-50">
                    <p>No segments available for Gantt chart</p>
                </div>
            )}
            
            {/* Always show for debugging */}
            <div className="mt-4 p-2 text-xs text-gray-500">
                Debug: Trip ID: {vm.trip?.id}, Segments: {vm.segments?.length || 0}, Plan ID: {vm.currentPlan?.id}
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
                        {/* <pre>
                            <code className="text-sm">
                                {JSON.stringify({ trip: vm.trip, segments: vm.segments }, null, 4)}
                            </code>
                        </pre> */}
                        <CollapsibleTree data={{
                            trip: vm.trip,
                            segments: vm.segments,
                            currentPlan: vm.currentPlan || null,
                        }} />
                    </div>
                </CollapsibleContent>
            </Collapsible>
        
        </div>
        
    )
    
}

export default TripDetail
