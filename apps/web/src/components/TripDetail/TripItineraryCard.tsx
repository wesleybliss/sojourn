import { cn } from '@repo/shared/utils'
import { Search } from 'lucide-react'
import { useMemo } from 'react'

import SadFolderIcon from '@/components/graphics/SadFolderIcon'
import TripDetailDenseItineraryTable from '@/components/TripDetail/TripDetailDenseItineraryTable'
import { TTripEditorViewModel } from '@/components/TripEditor/useTripEditorViewModel'
import { Input } from '@/components/ui/input'

interface TripItineraryCardProps {
    vm: TTripEditorViewModel
}

const TripItineraryCard = ({
    vm,
}: TripItineraryCardProps) => {
    
    const hasNoFilteredSegments = useMemo(() => (
        vm.segments.length > 0 && vm.filteredSegments.length === 0
    ), [vm.segments, vm.filteredSegments])
    
    return (
        
        <article className="section-card xl:col-span-7 overflow-hidden">
            
            <div className="flex flex-col gap-4 border-b border-border/70 px-5 py-4
                lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="eyebrow mb-2">Itinerary Ledger</div>
                    <h2 className="text-xl font-semibold tracking-[-0.04em]">Dense Itinerary Table</h2>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2
                                        size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            className="w-full rounded-full pl-9 sm:w-72"
                            onChange={e => vm.setSegmentsFilterQuery(e.target.value)}
                            placeholder="Filter by stop or date"
                            value={vm.segmentsFilterQuery} />
                    </div>
                    <button
                        className={cn(
                            'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                            vm.segmentsListShowCompleted
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border/70 bg-surface-container-low hover:bg-accent',
                        )}
                        onClick={() => vm.setSegmentsListShowCompleted(!vm.segmentsListShowCompleted)}
                        type="button">
                        {vm.segmentsListShowCompleted ? 'Hide completed' : 'Show completed'}
                    </button>
                </div>
            </div>
            
            <div className="scrollbar-minimal overflow-x-auto">
                <TripDetailDenseItineraryTable vm={vm} />
                {hasNoFilteredSegments && (
                    <div className="flex flex-col items-center justify-center gap-5 px-6 py-14 text-center">
                        <SadFolderIcon className="size-20 text-gray-400" />
                        <div>
                            <p className="font-medium">No itinerary rows match the current filters.</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Adjust the search or include completed segments to restore the full table.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        
        </article>
        
    )
    
}

export default TripItineraryCard
