import { memo } from 'react'
import {
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    CalendarCheck,
    CalendarRange,
    Plane,
    BedDouble,
    Globe,
    Clock,
} from 'lucide-react'

const SegmentsListDetailsTableHeader = () => {
    
    return (
        
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
                <TableHead className="w-5 pl-2 pr-0">
                    <div className="flex items-center" title="Segment completed, planned, or pending">
                        <Clock size="1.5rem" />
                    </div>
                </TableHead>
            </TableRow>
        </TableHeader>
        
    )
    
}

export default memo(SegmentsListDetailsTableHeader)
