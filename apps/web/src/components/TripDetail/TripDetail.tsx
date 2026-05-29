import { Segment } from '@repo/shared/types/database'
import { cn } from '@repo/shared/utils'
import { CalendarClock, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import GanttChart from '@/components/GanttChart'
import SadFolderIcon from '@/components/graphics/SadFolderIcon'
import TripDetailComplianceCard from '@/components/TripDetail/TripDetailComplianceCard'
import TripDetailDenseItineraryTable from '@/components/TripDetail/TripDetailDenseItineraryTable'
import TripDetailMap from '@/components/TripDetail/TripDetailMap'
import TripDetailOperationalSnapshot from '@/components/TripDetail/TripDetailOperationalSnapshot'
import { TTripEditorViewModel } from '@/components/TripEditor/useTripEditorViewModel'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

interface TripDetailProps {
    vm: TTripEditorViewModel
}

const TripDetail = ({
    vm,
}: TripDetailProps) => {
    
    const [timelineItems, setTimelineItems] = useState<Segment[]>(vm.segments)
    
    useEffect(() => {
        setTimelineItems(vm.segments)
    }, [vm.segments])
    
    const hasNoFilteredSegments = vm.segments.length > 0 && vm.filteredSegments.length === 0
    
    return (
        
        <div className="flex flex-1 flex-col gap-6 p-5 lg:p-0">
            {vm.isLoading && (
                <div className="section-card p-5">
                    <p className="mb-3 text-sm text-muted-foreground">Loading itinerary workspace...</p>
                    <Progress className="w-full" value={55} />
                </div>
            )}
            {/*<section className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">*/}
            {vm.showMap ? <TripDetailMap vm={vm} /> : (<>
                <section className="grid gap-5 xl:grid-cols-12">
                    
                    <div className="grid gap-5 md:grid-cols-2 xl:col-span-5 xl:grid-cols-1">
                        <TripDetailComplianceCard shengenData={vm.shengenData} />
                        <TripDetailOperationalSnapshot segments={vm.segments} />
                    </div>
                    
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
                </section>
                
                <section className="section-card overflow-hidden">
                    <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                        <div>
                            <div className="eyebrow mb-2">Timeline</div>
                            <h2 className="text-xl font-semibold tracking-[-0.04em]">Gantt Chart Timeline</h2>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full
                            bg-surface-container-low px-3 py-1.5 text-xs text-muted-foreground">
                            <CalendarClock className="size-4" />
                            Drag bars to test sequencing locally
                        </div>
                    </div>
                    <div className="p-4 lg:p-5">
                        <GanttChart
                            endDateKey="endDate"
                            items={timelineItems}
                            setItems={setTimelineItems}
                            startDateKey="startDate" />
                    </div>
                </section>
            </>)}
        </div>
        
    )
    
}

export default TripDetail
