import { memo } from 'react'
import { TableBody, TableRow, TableCell } from '@/components/ui/table'
import { CircleCheck, CircleAlert, Check, CheckCheck } from 'lucide-react'

const SegmentsListDetailsTableBody = ({
    totalDaysPerSegment = 0,
    cumulativeDaysPerSegment = 0,
    flightBooked = false,
    stayBooked = false,
    isShengenRegion = false,
    isSegmentPlanned,
    isSegmentCompleted,
} = {}) => {
    
    return (
        
        <TableBody>
            <TableRow>
                <TableCell className="w-5 pl-2 pr-0 text-left text-lg">
                    {totalDaysPerSegment}
                </TableCell>
                <TableCell className="w-5 pl-2 pr-0 text-left text-lg">
                    {cumulativeDaysPerSegment}
                </TableCell>
                <TableCell className="w-5 pl-2 pr-0">
                    <div className="flex items-center">
                        {flightBooked
                            ? <CircleCheck className="text-emerald-500" />
                            : <CircleAlert className="text-orange-500" />}
                    </div>
                </TableCell>
                <TableCell className="w-5 pl-2 pr-0">
                    <div className="flex items-center">
                        {stayBooked
                            ? <CircleCheck className="text-emerald-500" />
                            : <CircleAlert className="text-orange-500" />}
                    </div>
                </TableCell>
                <TableCell className="w-5 pl-2 pr-0">
                    <div className="flex items-center">
                        {isShengenRegion
                            ? <CircleCheck className="text-emerald-500" />
                            : <CircleAlert className="text-orange-500" />}
                    </div>
                </TableCell>
                <TableCell className="w-5 pl-2 pr-0">
                    <div className="flex items-center">
                        {isSegmentCompleted
                            ? <CheckCheck className="text-emerald-500" />
                            : isSegmentPlanned
                                ? <CheckCheck className="text-gray-500" />
                                : <Check className="text-orange-500" />}
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
        
    )
    
}

export default memo(SegmentsListDetailsTableBody)
