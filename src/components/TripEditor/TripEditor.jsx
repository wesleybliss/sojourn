'use client'

import { useState } from 'react'
import SegmentsTable from '@/components/segments/SegmentsTable'
import SegmentsGanttChart from '@/components/segments/SegmentsGanttChart'
import MapLibreMap from '@/components/MapLibreMap'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import LoadingSpinner from '@/components/LoadingSpinner'
import CollapsibleTree from '@/components/CollapsibleTree'

const TripEditor = ({
    vm,
} = {}) => {
    
    const [isDebugOpen, setIsDebugOpen] = useState(false)
    
    if (vm.isLoading)
        return <LoadingSpinner />
    
    if (vm.error)
        return <div>Error: {vm.error.message}</div>
    
    if (!vm.trip)
        return <LoadingSpinner />
    
    return (
        
        <div className="Trip w-full flex flex-col flex-1 gap-4 p-4">
            
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
                            getCumulativeDaysPerSegment={vm.getCumulativeDaysPerSegment}
                            getSegmentPlanned={vm.getSegmentPlanned}
                            getSegmentCompleted={vm.getSegmentCompleted} />
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

export default TripEditor
