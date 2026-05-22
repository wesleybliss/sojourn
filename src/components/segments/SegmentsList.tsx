import { useWireValue } from '@forminator/react-wire'
import { placeNamesToCoverImagesMap as placeNamesToCoverImagesMapWire } from '@/store'
import { Table } from '@/components/ui/table'
import { ArrowRight } from 'lucide-react'
import dayjs from '@/lib/dayjs'
import LeftImageCard from '@/components/ImageLeftCard'
import { backgroundToBorderColors } from '@/lib/colors'
import SegmentsListDetailsTableHeader from '@/components/segments/SegmentsListDetailsTableHeader'
import SegmentsListDetailsTableBody from '@/components/segments/SegmentsListDetailsTableBody'
import { cn } from '@/utils'
import { ID, Segment } from '@/types'

const SegmentCardDate = ({ date }: { date: Date }) => (
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

interface SegmentsListProps {
    segments: any[]
    segmentsListViewMode: 'grid' | 'list'
    getTotalDaysPerSegment: (segment: Segment) => number
    getCumulativeDaysPerSegment: (index: number) => number
    getSegmentPlanned: (segment: Segment) => boolean
    getSegmentCompleted: (segment: Segment) => boolean
    shufflePlaceCoverPhoto: (placeId: ID, topic?: string) => Promise<void>
}

const SegmentsList = ({
    segments,
    segmentsListViewMode,
    getTotalDaysPerSegment,
    getCumulativeDaysPerSegment,
    getSegmentPlanned,
    getSegmentCompleted,
    shufflePlaceCoverPhoto,
}: SegmentsListProps) => {
    
    const placeNamesToCoverImagesMap = useWireValue(placeNamesToCoverImagesMapWire)
    
    // Segments are already filtered by the viewmodel (search + completion status)
    // No additional filtering needed here
    
    return (
        
        <div className={cn('SegmentsList items-center gap-4 mx-auto', {
            'flex flex-col': segmentsListViewMode !== 'grid',
            'grid grid-cols-2': segmentsListViewMode === 'grid',
        })}>
            
            {segments.map((it, i) => (
                
                <LeftImageCard
                    key={it.id}
                    className={`border-r-4 ${backgroundToBorderColors[it.color].borderRight}`}
                    wrapperClassName="py-2 lg:py-4"
                    headerClassName="px-3 lg:px-5"
                    contentClassName="px-3 lg:px-5"
                    imageSrc={placeNamesToCoverImagesMap[it.name]?.url}
                    imageAlt={it.name}
                    maxWidth="max-w-full lg:max-w-2xl"
                    title={it.name}
                    description={
                        <div className="flex justify-between items-center gap-4">
                            <SegmentCardDate date={it.startDate} />
                            <div className="flex flex-col justify-center items-center content-center">
                                <ArrowRight className="opacity-50" />
                            </div>
                            <SegmentCardDate date={it.endDate} />
                        </div>
                    }
                    placeId={placeNamesToCoverImagesMap[it.name]?.id}
                    shufflePlaceCoverPhoto={shufflePlaceCoverPhoto}>
                    <div className="overflow-x-auto mt-2">
                        <Table>
                            <SegmentsListDetailsTableHeader />
                            <SegmentsListDetailsTableBody
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
