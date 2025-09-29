import { useWireValue } from '@forminator/react-wire'
import { placeNamesToCoverImagesMap as placeNamesToCoverImagesMapWire } from '@/store'
import {
    Table,
    TableBody,
    // TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { ArrowRight } from 'lucide-react'
import dayjs from '@/lib/dayjs'
import LeftImageCard from '@/components/ImageLeftCard'

const SegmentCardDate = ({ date }) => (
    <div>
        <div className="text-sm font-medium text-muted-foreground">
            {dayjs(date).format('dddd')}
        </div>
        <div className="flex items-center text-base font-medium">
            <span>{dayjs(date).format('MMM Do')}</span>
            <span className="text-muted-foreground">, {dayjs(date).format('YYYY')}</span>
        </div>
    </div>
)

const SegmentsList = ({
    segments,
    getTotalDaysPerSegment,
    getCumulativeDaysPerSegment,
}) => {
    
    const placeNamesToCoverImagesMap = useWireValue(placeNamesToCoverImagesMapWire)
    
    return (
        
        <div className="SegmentsList w-full flex flex-col items-center gap-4 mx-auto">
            
            {segments.map((it, i) => (
                
                <LeftImageCard
                    key={it.id}
                    wrapperClassName="py-2 lg:py-4"
                    headerClassName="px-3 lg:px-5"
                    contentClassName="px-3 lg:px-5"
                    imageSrc={placeNamesToCoverImagesMap[it.name]}
                    imageAlt={it.name}
                    maxWidth="max-w-full lg:max-w-2xl"
                    title={<h3 className="text-xl">{it.name}</h3>}
                    description={
                        <div className="flex items-center gap-4">
                            <SegmentCardDate date={it.startDate} />
                            <div className="flex flex-col justify-center items-center content-center">
                                <ArrowRight className="opacity-50" />
                            </div>
                            <SegmentCardDate date={it.endDate} />
                        </div>
                    }>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-left">Total Days</TableHead>
                                    <TableHead className="text-left">Cumulative Days</TableHead>
                                    <TableHead className="text-left">Flight</TableHead>
                                    <TableHead className="text-left">Stay</TableHead>
                                    <TableHead className="text-left">Shengen</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-left">{getTotalDaysPerSegment(it)}</TableCell>
                                    <TableCell className="text-left">{getCumulativeDaysPerSegment(i)}</TableCell>
                                    <TableCell className="text-left">{it.flightBooked ? 'yes': 'no'}</TableCell>
                                    <TableCell className="text-left">{it.stayBooked ? 'yes': 'no'}</TableCell>
                                    <TableCell className="text-left">{it.isShengenRegion ? 'yes': 'no'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </LeftImageCard>
                
            ))}
        
        </div>
        
    )
    
}

export default SegmentsList
