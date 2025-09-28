import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
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

const SegmentCardDate = ({ date }) => (
    <div>
        <div className="text-sm font-medium text-muted-foreground">
            {dayjs(date).format('dddd')}
        </div>
        <div className="flex items-center text-lg font-medium">
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
    
    return (
        
        <div className="SegmentsList w-full flex flex-col items-center gap-4 mx-auto">
            
            {segments.map((it, i) => (
                
                <Card key={it.id} className="w-full max-w-lg">
                    
                    <CardHeader>
                        <CardTitle>
                            {it.name || ''}
                        </CardTitle>
                        <CardDescription>
                            {it.description || ''}
                        </CardDescription>
                        {/* <CardAction>
                            <Button variant="link">Sign Up</Button>
                        </CardAction> */}
                    </CardHeader>
                    
                    <CardContent>
                        
                        <div className="flex items-center gap-4">
                            <SegmentCardDate date={it.startDate} />
                            <div className="flex flex-col justify-center items-center content-center">
                                <ArrowRight className="opacity-50" />
                            </div>
                            <SegmentCardDate date={it.endDate} />
                        </div>
                        
                        {/* <h4>{formatDate(it.startDate)} &mdash; {formatDate(it.endDate)}</h4> */}
                        {/* <div className={`size-4 bg-[${it.color}]`} />
                        <div>Total Days: {getTotalDaysPerSegment(it)}</div>
                        <div>Cumulative Days: {getCumulativeDaysPerSegment(i)}</div>
                        <div>Flight: {it.flightBooked ? 'yes': 'no'}</div>
                        <div>Stay: {it.stayBooked ? 'yes': 'no'}</div>
                        <div>Shengen: {it.isShengenRegion ? 'yes': 'no'}</div> */}
                        
                        {/* <Table>
                            <TableBody>
                                <TableRow>
                                    <TableHead>Total Days</TableHead>
                                    <TableCell className="">{getTotalDaysPerSegment(it)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Cumulative Days</TableHead>
                                    <TableCell className="">{getCumulativeDaysPerSegment(i)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Flight</TableHead>
                                    <TableCell className="">{it.flightBooked ? 'yes': 'no'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Stay</TableHead>
                                    <TableCell className="">{it.stayBooked ? 'yes': 'no'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Shengen</TableHead>
                                    <TableCell className="">{it.isShengenRegion ? 'yes': 'no'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table> */}
                        
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Total Days</TableHead>
                                    <TableHead>Cumulative Days</TableHead>
                                    <TableHead>Flight</TableHead>
                                    <TableHead>Stay</TableHead>
                                    <TableHead>Shengen</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="">{getTotalDaysPerSegment(it)}</TableCell>
                                    <TableCell className="">{getCumulativeDaysPerSegment(i)}</TableCell>
                                    <TableCell className="">{it.flightBooked ? 'yes': 'no'}</TableCell>
                                    <TableCell className="">{it.stayBooked ? 'yes': 'no'}</TableCell>
                                    <TableCell className="">{it.isShengenRegion ? 'yes': 'no'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    
                    </CardContent>
                    
                    {/* <CardFooter className="flex-col gap-2">
                        <button type="submit" className="w-full">
                            Login
                        </button>
                        <button variant="outline" className="w-full">
                            Login with Google
                        </button>
                    </CardFooter> */}
                
                </Card>
                
            ))}
        
        </div>
        
    )
    
}

export default SegmentsList
