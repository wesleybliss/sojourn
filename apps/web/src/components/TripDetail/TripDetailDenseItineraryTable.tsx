import { SegmentStatusLabel } from '@repo/shared/types'
import { cn } from '@repo/shared/utils'
import dayjs from 'dayjs'
import { BedDouble, Globe2, Plane, TrainFront } from 'lucide-react'

import { TTripEditorViewModel } from '@/components/TripEditor/useTripEditorViewModel'

/*
status === 'Completed' && 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
status === 'Confirmed' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/55 dark:text-emerald-300',
status === 'Partial' && 'bg-amber-100 text-amber-700 dark:bg-amber-950/55 dark:text-amber-300',
status === 'Planning' && 'bg-rose-100 text-rose-700 dark:bg-rose-950/55 dark:text-rose-300',
*/
const SegmentStatusLabelsColorMap: Record<SegmentStatusLabel, string> = {
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
                {vm.filteredSegments.map((segment, index) => {
                    
                    const status = vm.getStatusLabel(segment, vm)
                    const originalIndex = vm.segments.findIndex(item => item.id === segment.id)
                    
                    return (
                        
                        <tr className="h-10" key={segment.id}>
                            <td className="px-4 py-3">
                                <div className="font-medium">{segment.name}</div>
                                {segment.description && (
                                    <div className="line-clamp-1 text-xs text-muted-foreground">
                                        {segment.description}
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                                {dayjs(segment.startDate as Date).format('MMM D')}
                                &nbsp;-&nbsp;
                                {dayjs(segment.endDate as Date).format('MMM D')}
                            </td>
                            <td className="px-4 py-3">{vm.getTotalDaysPerSegment(segment)}</td>
                            <td className="px-4 py-3">
                                {vm.getCumulativeDaysPerSegment(
                                    originalIndex >= 0 ? originalIndex : index)}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Plane className={cn('size-4', segment.flightBooked && 'text-emerald-500')} />
                                    <TrainFront className="size-4 text-slate-400" />
                                    <BedDouble className={cn('size-4', segment.stayBooked && 'text-sky-500')} />
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <span className={cn(
                                    'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
                                    segment.isShengenRegion
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                                        : 'bg-surface-container-low text-muted-foreground',
                                )}>
                                    <Globe2 className="mr-1 size-3.5" />
                                    {segment.isShengenRegion ? 'Schengen' : 'Open'}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <span className={cn(
                                    'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
                                    SegmentStatusLabelsColorMap[status],
                                )}>
                                    {status}
                                </span>
                            </td>
                        </tr>
                        
                    )
                    
                })}
            
            </tbody>
        
        </table>
        
    )
    
}

export default TripDetailDenseItineraryTable
