import useTripViewModel from './TripViewModel'
import SegmentsTable from './SegmentsTable'
import SegmentsGanttChart from '@/components/SegmentsGanttChart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DatePicker from '@/components/DatePicker'
import { FolderPen, MapPinPlus } from 'lucide-react'

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
            
            <header className="flex flex-col gap-2">
                <div className="flex items-center gap-12">
                    <div className="flex items-center justify-between group">
                        {vm.isEditingName ? (
                            <Input
                                type="text"
                                placeholder="New trip"
                                value={vm.currentTrip?.name || ''}
                                onChange={vm.updateTrip('name')} />
                        ) : (
                            <div className="flex items-center gap-4">
                                <h1
                                    className=""
                                    onDoubleClick={() => vm.setIsEditingName(true)}
                                    onBlur={() => vm.setIsEditingName(false)}
                                    autoFocus>
                                    {vm.currentTrip?.name || 'New Trip'}
                                </h1>
                                <FolderPen className="opacity-0 group-hover:opacity-20 hover:opacity-100
                                    transition-opacity ease-in-out duration-300" />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <DatePicker
                            date={vm.currentTrip?.startDate || Date.now()}
                            onSelect={vm.updateTrip('startDate')} />
                        <DatePicker
                            date={vm.currentTrip?.endDate || Date.now()}
                            onSelect={vm.updateTrip('endDate')} />
                    </div>
                </div>
                <div className="">
                    <p className="text-muted-foreground">
                        {vm.currentTrip?.description || 'New trip description'}
                    </p>
                </div>
            </header>
            
            <header className="flex items-center justify-between">
                <h2>Segments</h2>
                <Button
                    variant="outline"
                    onClick={() => vm.addSegment(vm.currentTrip.id, {
                        name: 'New segment',
                        description: 'New segment description',
                    })}>
                    <MapPinPlus />
                    New Segment
                </Button>
            </header>
            
            {vm.currentTrip && vm.segments?.length <= 0 && (
                <p>You have no segments yet.</p>
            )}
            
            <div className="flex flex-col gap-2 w-fit">
                {vm.segments?.length > 0 && (
                    <SegmentsTable
                        segments={vm.segments}
                        updateSegment={vm.updateSegment}
                        deleteSegments={vm.deleteSegments} />
                )}
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
