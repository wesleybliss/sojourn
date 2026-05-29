import { Segment } from '@repo/shared/types/database'
import { CalendarClock } from 'lucide-react'
import { useEffect, useState } from 'react'

import GanttChart from '@/components/GanttChart'
import TripDetailComplianceCard from '@/components/TripDetail/TripDetailComplianceCard'
import TripDetailMap from '@/components/TripDetail/TripDetailMap'
import TripDetailOperationalSnapshot from '@/components/TripDetail/TripDetailOperationalSnapshot'
import TripItineraryCard from '@/components/TripDetail/TripItineraryCard'
import { TTripEditorViewModel } from '@/components/TripEditor/useTripEditorViewModel'
import TripMap from '@/components/TripMap'
import { Progress } from '@/components/ui/progress'

const DEBUG_USE_LEGACY_MAP = false

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
    
    return (
        
        <div className="flex flex-1 flex-col gap-6 p-5 lg:p-0">
            {vm.isLoading && (
                <div className="section-card p-5">
                    <p className="mb-3 text-sm text-muted-foreground">Loading itinerary workspace...</p>
                    <Progress className="w-full" value={55} />
                </div>
            )}
            {/*<section className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">*/}
            {vm.showMap ? (
                DEBUG_USE_LEGACY_MAP ? <TripDetailMap vm={vm} /> : (
                    <section className="py-2">
                        <TripMap className="min-h-[70vh] w-full" segments={vm.segments} />
                    </section>
                )
            ) : (<>
                
                <section className="grid gap-5 xl:grid-cols-12 py-6">
                    
                    <div className="grid gap-5 md:grid-cols-2 xl:col-span-5 xl:grid-cols-1 xl:flex xl:flex-col">
                        <TripDetailComplianceCard shengenData={vm.shengenData} />
                        <TripDetailOperationalSnapshot segments={vm.segments} />
                    </div>
                    
                    <TripItineraryCard vm={vm} />
                
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
