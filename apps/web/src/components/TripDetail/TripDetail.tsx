import { Segment } from '@repo/shared/types/database'
import { CalendarClock, LockKeyhole, LockKeyholeOpen } from 'lucide-react'
import { useEffect, useState } from 'react'

import GanttChart from '@/components/GanttChart'
import TripDetailComplianceCard from '@/components/TripDetail/TripDetailComplianceCard'
import TripDetailMap from '@/components/TripDetail/TripDetailMap'
import TripDetailOperationalSnapshot from '@/components/TripDetail/TripDetailOperationalSnapshot'
import TripItineraryCard from '@/components/TripDetail/TripItineraryCard'
import { TTripEditorViewModel } from '@/components/TripEditor/useTripEditorViewModel'
import TripMap from '@/components/TripMap'
import { Progress } from '@/components/ui/progress'
import { Toggle } from '@/components/ui/toggle'

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
        
        <div className="flex flex-1 flex-col gap-3 p-5 lg:p-0">
            
            {vm.isLoading && (
                <div className="section-card p-5 mt-3">
                    <p className="mb-3 text-sm text-muted-foreground">Loading itinerary workspace...</p>
                    <Progress className="w-full" value={55} />
                </div>
            )}
            
            {vm.showMap ? (
                DEBUG_USE_LEGACY_MAP ? <TripDetailMap vm={vm} /> : (
                    <section className="py-2">
                        <TripMap className="min-h-[70vh] w-full" segments={vm.segments} />
                    </section>
                )
            ) : (<>
                
                <section className="grid gap-3 xl:grid-cols-12 pt-3">
                    
                    <div className="grid gap-3 md:grid-cols-2 xl:col-span-5 xl:grid-cols-1 xl:flex xl:flex-col">
                        <TripDetailComplianceCard shengenData={vm.shengenData} />
                        <TripDetailOperationalSnapshot segments={vm.segments} />
                    </div>
                    
                    <TripItineraryCard vm={vm} />
                
                </section>
                
                <section className="section-card overflow-hidden">
                    <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                        <div>
                            <div className="eyebrow mb-2">
                                Timeline
                            </div>
                            <h2 className="text-xl font-semibold tracking-[-0.04em]">
                                Gantt Chart Timeline
                            </h2>
                        </div>
                        <div className="flex justify-end items-center gap-2">
                            <Toggle
                                className="data-[state=on]:bg-red-500/10 data-[state=on]:*:[svg]:stroke-accent-900
                                    data-[state=off]:bg-accent/70 data-[state=off]:*:[svg]:stroke-accent-900"
                                title="Toggle locked gantt chart"
                                aria-label="Toggle locked gantt chart"
                                size="sm"
                                variant="outline"
                                pressed={vm.isGanttChartLocked}
                                onPressedChange={vm.setIsGanttChartLocked}>
                                {vm.isGanttChartLocked
                                    ? <LockKeyhole />
                                    : <LockKeyholeOpen />}
                            </Toggle>
                            <div className="inline-flex items-center gap-2 rounded-full
                                bg-surface-container-low px-3 py-1.5 text-xs text-muted-foreground">
                                <CalendarClock className="size-4" />
                                Drag bars to test sequencing locally
                            </div>
                        </div>
                    </div>
                    <div className="GanttChart-wrap p-4 lg:p-5">
                        <GanttChart
                            endDateKey="endDate"
                            items={timelineItems}
                            setItems={setTimelineItems}
                            startDateKey="startDate"
                            enabled={vm.isGanttChartLocked} />
                    </div>
                </section>
            
            </>)}
        
        </div>
        
    )
    
}

export default TripDetail
