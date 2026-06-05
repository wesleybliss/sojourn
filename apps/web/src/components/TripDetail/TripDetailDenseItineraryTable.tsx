import { SegmentStatusLabel } from '@repo/shared/types'

import TripDetailDenseItineraryTableRow from '@/components/TripDetail/TripDetailDenseItineraryTableRow'
import { TTripEditorViewModel } from '@/components/TripEditor/useTripEditorViewModel'
import { Button } from '@/components/ui/button'

const segmentStatusLabelsColorMap: Record<SegmentStatusLabel, string> = {
    Completed: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    Confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/55 dark:text-emerald-300',
    Partial: 'bg-amber-100 text-amber-700 dark:bg-amber-950/55 dark:text-amber-300',
    Planning: 'bg-rose-100 text-rose-700 dark:bg-rose-950/55 dark:text-rose-300',
}

interface TripDetailDenseItineraryTableProps {
    vm: TTripEditorViewModel
}

const TripDetailDenseItineraryTable = ({
    vm,
}: TripDetailDenseItineraryTableProps) => {
    
    return (
        
        <table className="min-w-full text-sm">
            <thead className="bg-surface-container-low text-left text-xs uppercase
                tracking-[0.18em] text-muted-foreground">
                <tr>
                    <th className="px-4 py-3 font-medium">Stop</th>
                    <th className="px-4 py-3 font-medium">Dates</th>
                    <th className="px-4 py-3 font-medium">Days</th>
                    <th className="px-4 py-3 font-medium">Cumulative</th>
                    <th className="px-4 py-3 font-medium">Bookings</th>
                    <th className="px-4 py-3 font-medium">Region</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
                
                {vm.completedSegmentCount > 0 && !vm.segmentsListShowCompleted && (
                    <tr>
                        <td className="px-4 py-1 italic text-muted-foreground" colSpan={7}>
                            <span>Omitted {vm.completedSegmentCount} completed segments.</span>
                            <Button
                                className="ml-2 text-primary/70 hover:text-primary"
                                variant="link"
                                onClick={() => vm.setSegmentsListShowCompleted(true)}>
                                Show completed
                            </Button>
                        </td>
                    </tr>
                )}
                
                {vm.filteredSegments.map((segment, index) => {
                    
                    const status: SegmentStatusLabel = vm.getStatusLabel(segment, vm)
                    const originalIndex = vm.segments.findIndex(item => item.id === segment.id)
                    
                    return (
                        
                        <TripDetailDenseItineraryTableRow
                            key={segment.id}
                            segment={segment}
                            status={status}
                            totalDaysPerSegment={vm.getTotalDaysPerSegment(segment)}
                            cumulativeDaysPerSegment={vm.getCumulativeDaysPerSegment(
                                originalIndex >= 0 ? originalIndex : index)}
                            segmentStatusLabelsColor={segmentStatusLabelsColorMap[status]} />
                        
                    )
                    
                })}
            
            </tbody>
        
        </table>
        
    )
    
}

export default TripDetailDenseItineraryTable
