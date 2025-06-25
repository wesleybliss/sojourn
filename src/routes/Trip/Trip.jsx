import useTripViewModel from './TripViewModel'
import TripHeader from './TripHeader'
import SegmentsTable from './SegmentsTable'
import SegmentsGanttChart from '@/components/SegmentsGanttChart'
import MapLibreMap from '@/components/MapLibreMap'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { MapPinPlus } from 'lucide-react'

// @todo @debug
import { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'

const Trip = () => {
    
    const vm = useTripViewModel()
    
    const [isDebugOpen, setIsDebugOpen] = useState(false)
    
    if (!vm.currentTrip)
        return <p>Loading...</p>
    
    return (
        
        <div className="Trip w-full flex flex-col flex-1 gap-4 p-4">
            
            <TripHeader
                currentTrip={vm.currentTrip}
                currentPlan={vm.currentPlan}
                plans={vm.plans}
                updateTrip={vm.updateTrip}
                backupTrip={vm.backupTrip} />
            
            <header className="flex items-center justify-between">
                <h3>Segments</h3>
                <div className="flex items-center justify-end gap-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="toggle-map"
                            checked={vm.showMap}
                            onCheckedChange={checked => vm.setShowMap(checked)} />
                        <Label htmlFor="toggle-map">Show Map</Label>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => vm.addSegment(vm.currentTrip.id, {
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
                    {vm.currentTrip && vm.segments?.length <= 0 && (
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
                {vm.showMap && <MapLibreMap latLng={vm.focusedLatLng} />}
            </div>
            
            {vm.currentTrip && vm.segments?.length > 0 && (
                <SegmentsGanttChart
                    tripId={vm.currentTrip.id} />
            )}
            
            <div className="flex-1">&nbsp;</div>
            
            <Collapsible
                open={isDebugOpen}
                onOpenChange={setIsDebugOpen}
                className="w-full space-y-2">
                <div className="w-[350px] flex items-center justify-between space-x-4 px-4">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <h4 className="text-sm font-semibold">
                                Trip Debug
                            </h4>
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                    <div><pre><code className="text-sm">{
                        JSON.stringify(vm.currentTrip, null, 4)
                    }</code></pre></div>
                </CollapsibleContent>
            </Collapsible>
        
        </div>
        
    )
    
}

export default Trip
