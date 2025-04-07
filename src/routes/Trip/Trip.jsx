import useTripViewModel from './TripViewModel'
import SegmentListItem from '@/components/SegmentListItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FolderPen, MapPinPlus } from 'lucide-react'

const Trip = () => {
    
    const vm = useTripViewModel()
    
    return (
        
        <div className="Trip w-full flex flex-col gap-4 p-4">
            
            <header className="flex items-center justify-between">
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
                        <FolderPen className="opacity-20 hover:opacity-100
                            transition-opacity ease-in-out duration-300" />
                    </div>
                )}
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
            <div className="flex flex-col gap-2 w-fit">
                {vm.currentTrip?.segments?.map(it => (
                    /* <SegmentCard
                        key={it.id}
                        segment={it}
                        updateSegment={vm.updateSegment}
                        deleteSegment={vm.updateSegment} /> */
                    <SegmentListItem
                        key={it.id}
                        segment={it}
                        updateSegment={vm.updateSegment}
                        deleteSegment={vm.updateSegment} />
                ))}
            </div>
            <div><pre><code>{JSON.stringify(vm.currentTrip, null, 4)}</code></pre></div>
        
        </div>
        
    )
    
}

export default Trip
