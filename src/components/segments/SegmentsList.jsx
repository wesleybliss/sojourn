import { useMemo } from 'react'
import { useWireValue } from '@forminator/react-wire'
import { placeNamesToCoverImagesMap as placeNamesToCoverImagesMapWire } from '@/store'
import { Table } from '@/components/ui/table'
import { ArrowRight } from 'lucide-react'
import dayjs from '@/lib/dayjs'
import LeftImageCard from '@/components/ImageLeftCard'
import { backgroundToBorderColors } from '@/lib/colors'
import SegmentsListDetailsTableHeader from '@/components/segments/SegmentsListDetailsTableHeader'
import SegmentsListDetailsTableBody from '@/components/segments/SegmentsListDetailsTableBody'
import { cn } from '@/lib/utils'

const SegmentCardDate = ({ date }) => (
    <div className="w-full px-3 py-2 bg-slate-100 rounded-lg">
        <div className="text-sm font-medium text-muted-foreground">
            {dayjs(date).format('dddd')}
        </div>
        <div className="flex items-center text-base font-medium font-mono">
            <span>{dayjs(date).format('MMM Do')}</span>
            <span className="text-muted-foreground">, {dayjs(date).format('YYYY')}</span>
        </div>
    </div>
)

const SegmentsList = ({
    segments,
    segmentsListShowCompleted,
    segmentsListViewMode,
    getTotalDaysPerSegment,
    getCumulativeDaysPerSegment,
    getSegmentPlanned,
    getSegmentCompleted,
}) => {
    
    const placeNamesToCoverImagesMap = useWireValue(placeNamesToCoverImagesMapWire)
    
    const filteredSegments = useMemo(() => (
        segmentsListShowCompleted
            ? segments
            : segments.filter(it => dayjs(it.endDate).isAfter(dayjs()))
    ), [segments, segmentsListShowCompleted])
    
    return (
        
        <div className={cn('SegmentsList items-center gap-4 mx-auto', {
            'flex flex-col': segmentsListViewMode !== 'grid',
            'grid grid-cols-2': segmentsListViewMode === 'grid',
        })}>
            
            {filteredSegments.map((it, i) => (
                
                <LeftImageCard
                    key={it.id}
                    className={`border-r-4 ${backgroundToBorderColors[it.color].borderRight}`}
                    wrapperClassName="py-2 lg:py-4"
                    headerClassName="px-3 lg:px-5"
                    contentClassName="px-3 lg:px-5"
                    imageSrc={placeNamesToCoverImagesMap[it.name]}
                    imageAlt={it.name}
                    maxWidth="max-w-full lg:max-w-2xl"
                    title={<h3 className="text-xl">{it.name}</h3>}
                    description={
                        <div className="flex justify-between items-center gap-4">
                            <SegmentCardDate date={it.startDate} />
                            <div className="flex flex-col justify-center items-center content-center">
                                <ArrowRight className="opacity-50" />
                            </div>
                            <SegmentCardDate date={it.endDate} />
                        </div>
                    }>
                    <div className="overflow-x-auto mt-2">
                        <Table>
                            <SegmentsListDetailsTableHeader />
                            <SegmentsListDetailsTableBody
                                endDate={it.endDate}
                                totalDaysPerSegment={getTotalDaysPerSegment(it)}
                                cumulativeDaysPerSegment={getCumulativeDaysPerSegment(i)}
                                flightBooked={it.flightBooked}
                                stayBooked={it.stayBooked}
                                isShengenRegion={it.isShengenRegion}
                                isSegmentPlanned={getSegmentPlanned(it)}
                                isSegmentCompleted={getSegmentCompleted(it)} />
                        </Table>
                    </div>
                </LeftImageCard>
                
            ))}
        
        </div>
        
    )
    
}

export default SegmentsList
