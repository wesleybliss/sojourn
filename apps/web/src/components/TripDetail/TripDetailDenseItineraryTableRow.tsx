import { Segment } from '@repo/shared/types'
import { SegmentStatusLabel } from '@repo/shared/types'
import { cn } from '@repo/shared/utils'
import dayjs from 'dayjs'
import { BedDouble, Globe2, Plane, TrainFront } from 'lucide-react'

export interface TripDetailDenseItineraryTableRowProps {
    segment: Segment
    status: SegmentStatusLabel
    totalDaysPerSegment: number
    cumulativeDaysPerSegment: number
    segmentStatusLabelsColor: string
}

const TripDetailDenseItineraryTableRow = ({
    segment,
    status,
    totalDaysPerSegment,
    cumulativeDaysPerSegment,
    segmentStatusLabelsColor,
}: TripDetailDenseItineraryTableRowProps) => {
    
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
            
            <td className="px-4 py-3">{totalDaysPerSegment}</td>
            
            <td className="px-4 py-3">
                {cumulativeDaysPerSegment}
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
                    segmentStatusLabelsColor,
                )}>
                    {status}
                </span>
            </td>
        
        </tr>
        
    )
    
}

export default TripDetailDenseItineraryTableRow
