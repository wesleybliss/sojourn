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
import {
    ArrowRight,
    CalendarCheck,
    CalendarRange,
    Plane,
    BedDouble,
    Globe,
    CircleAlert,
    CircleCheck,
} from 'lucide-react'
import dayjs from '@/lib/dayjs'
import LeftImageCard from '@/components/ImageLeftCard'
import { backgroundToBorderColors } from '@/lib/colors'

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
                    className={`border-r-4 ${backgroundToBorderColors[it.color].borderRight}`}
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
                    <div className="overflow-x-auto mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-5 pl-0 pr-0">
                                        <div className="flex items-center">
                                            <CalendarCheck title="Segment Days"/>
                                        </div>
                                    </TableHead>
                                    <TableHead className="w-5 pl-0 pr-0">
                                        <div className="flex items-center">
                                            <CalendarRange title="Cumulative Days" />
                                        </div>
                                    </TableHead>
                                    <TableHead className="w-5 pl-2 pr-0">
                                        <div className="flex items-center" title="Flight Booked">
                                            <Plane />
                                        </div>
                                    </TableHead>
                                    <TableHead className="w-5 pl-2 pr-0">
                                        <div className="flex items-center" title="Stay Booked">
                                            <BedDouble />
                                        </div>
                                    </TableHead>
                                    <TableHead className="w-5 pl-2 pr-0">
                                        <div className="flex items-center" title="Shengen Region">
                                            <Globe size="1.5rem" />
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="w-5 pl-2 pr-0 text-left text-lg">
                                        {getTotalDaysPerSegment(it)}
                                    </TableCell>
                                    <TableCell className="w-5 pl-2 pr-0 text-left text-lg">
                                        {getCumulativeDaysPerSegment(i)}
                                    </TableCell>
                                    <TableCell className="w-5 pl-2 pr-0">
                                        <div className="flex items-center">
                                            {it.flightBooked
                                                ? <CircleCheck className="text-emerald-500" />
                                                : <CircleAlert className="text-orange-500" />}
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-5 pl-2 pr-0">
                                        <div className="flex items-center">
                                            {it.stayBooked
                                                ? <CircleCheck className="text-emerald-500" />
                                                : <CircleAlert className="text-orange-500" />}
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-5 pl-2 pr-0">
                                        <div className="flex items-center">
                                            {it.isShengenRegion
                                                ? <CircleCheck className="text-emerald-500" />
                                                : <CircleAlert className="text-orange-500" />}
                                        </div>
                                    </TableCell>
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
