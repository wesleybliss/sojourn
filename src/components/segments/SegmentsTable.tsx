import { useCallback } from 'react'
import useCheckItems from '@/hooks/useCheckItems'
import { Checkbox } from '@/components/ui/checkbox'
import EditableTextField from '@/components/EditableTextField'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    // TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import DatePicker from '@/components/DatePicker'
import TailwindPrimaryColorPicker from '@/components/TailwindPrimaryColorPicker'
import ConfirmDeleteSegmentsDialog from '@/components/ConfirmDeleteSegmentsDialog'
import {
    CalendarCheck,
    CalendarRange,
    Plane,
    BedDouble,
    SquareArrowUp,
    SquareArrowDown,
    Globe,
    CheckCheck,
    Check,
    Clock,
} from 'lucide-react'
import { cn } from '@/utils'
import dayjs from 'dayjs'
import { ID, Segment } from '@/types'

interface SegmentsTableProps {
    segments: Segment[]
    updateSegment: (id: ID, field: keyof Segment) => (value: string | boolean | Date | undefined) => void
    deleteSegments: (ids: ID[]) => Promise<void>
    getTotalDaysPerSegment: (segment: Segment) => number
    getCumulativeDaysPerSegment: (index: number) => number
    getSegmentPlanned: (segment: Segment) => boolean
    getSegmentCompleted: (segment: Segment) => boolean
}

const SegmentsTable = ({
    segments,
    updateSegment,
    deleteSegments,
    getTotalDaysPerSegment,
    getCumulativeDaysPerSegment,
    getSegmentPlanned,
    getSegmentCompleted,
}: SegmentsTableProps) => {
    
    const {
        checked,
        anyChecked,
        allChecked,
        someChecked,
        hasChecked,
        toggleChecked,
        toggleAllChecked,
    } = useCheckItems(segments)
    
    const updateCheckedSegments = useCallback((field: keyof Segment) => async (e: boolean) => {
        
        if (!anyChecked)
            return console.warn('updateCheckedSegments called, but no segments checked')
        
        await Promise.all(checked.map(it => updateSegment(it, field)(e)))
        
    }, [checked, anyChecked, updateSegment])
    
    return (
        
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <Checkbox
                            checked={allChecked ? true : someChecked ? 'indeterminate' : false}
                            onCheckedChange={checked => toggleAllChecked(checked === true)} />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>
                        <div
                            className="mx-auto size-6 rounded-full bg-conic/decreasing
                                from-violet-700 via-lime-300 to-violet-700 opacity-60"
                            title="Segment Color" />
                    </TableHead>
                    <TableHead>
                        <div title="Segment Days">
                            <CalendarCheck className="mx-auto" />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div title="Cumulative Days">
                            <CalendarRange className="mx-auto" />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div title="Flight Booked">
                            <Plane />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div title="Stay Booked">
                            <BedDouble />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div title="Shengen Region">
                            <Globe size="1.5rem" />
                        </div>
                    </TableHead>
                    <TableHead className="w-5 pl-2 pr-0">
                        <div className="flex items-center" title="Segment completed, planned, or pending">
                            <Clock size="1.5rem" />
                        </div>
                    </TableHead>
                    <TableHead>{/* Delete Icon */}&nbsp;</TableHead>
                </TableRow>
                {anyChecked && (
                    <TableRow>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>
                            <div className={cn(
                                'flex flex-col items-center justify-center',
                                'border border-slate-400 rounded-md',
                            )}>
                                <TailwindPrimaryColorPicker
                                    value="bg-rainbow-right"
                                    onChange={updateCheckedSegments('color')} />
                            </div>
                        </TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>
                            <ConfirmDeleteSegmentsDialog
                                className={anyChecked ? '' : 'hidden'}
                                isMultiple={anyChecked}
                                disabled={!anyChecked}
                                onConfirm={() => deleteSegments(checked)} />
                        </TableHead>
                    </TableRow>
                )}
            </TableHeader>
            <TableBody>
                {segments.map((it, i) => (
                    <TableRow
                        key={it.id}
                        data-id={it?.id}
                        className={dayjs(it.startDate as Date).isAfter(dayjs(it.endDate as Date)) ? 'border border-red-500' : ''}>
                        
                        <TableCell className="w-5">
                            <Checkbox
                                checked={hasChecked(it.id)}
                                onCheckedChange={() => toggleChecked(it.id)} />
                        </TableCell>
                        
                        <TableCell className="font-medium">
                            <EditableTextField
                                value={it.name || ''}
                                placeholder="New segment"
                                as="h5"
                                onChange={updateSegment(it.id, 'name')} />
                        </TableCell>
                        
                        <TableCell>
                            <DatePicker
                                buttonClassName="!p-0 border-b border-secondary rounded-none
                                    hover:no-underline hover:border-primary"
                                buttonVariant="link"
                                date={it.startDate as Date || Date.now()}
                                onSelect={updateSegment(it.id, 'startDate')} />
                        </TableCell>
                        
                        <TableCell>
                            <DatePicker
                                buttonClassName="!p-0 border-b border-secondary rounded-none
                                    hover:no-underline hover:border-primary"
                                buttonVariant="link"
                                date={it.endDate as Date || Date.now()}
                                onSelect={updateSegment(it.id, 'endDate')} />
                        </TableCell>
                        
                        <TableCell>
                            <div className={cn(
                                'flex flex-col items-center justify-center',
                                'border border-secondary rounded-md',
                            )}>
                                <TailwindPrimaryColorPicker
                                    value={it.color}
                                    onChange={updateSegment(it.id, 'color')} />
                            </div>
                        </TableCell>
                        
                        <TableCell className="text-center">
                            {getTotalDaysPerSegment(it)}
                        </TableCell>
                        
                        <TableCell className="text-center">
                            {getCumulativeDaysPerSegment(i)}
                        </TableCell>
                        
                        <TableCell>
                            <Switch
                                checked={it.flightBooked}
                                onCheckedChange={updateSegment(it.id, 'flightBooked')} />
                        </TableCell>
                        
                        <TableCell>
                            <Switch
                                checked={it.stayBooked}
                                onCheckedChange={updateSegment(it.id, 'stayBooked')} />
                        </TableCell>
                        
                        <TableCell>
                            <Switch
                                checked={it.isShengenRegion}
                                onCheckedChange={updateSegment(it.id, 'isShengenRegion')} />
                        </TableCell>
                        
                        <TableCell className="text-center">
                            <div className="flex items-center">
                                {getSegmentCompleted(it)
                                    ? <CheckCheck className="text-emerald-500" />
                                    : getSegmentPlanned(it)
                                        ? <CheckCheck className="text-gray-500" />
                                        : <Check className="text-orange-500" />}
                            </div>
                        </TableCell>
                        
                        <TableCell>
                            <ConfirmDeleteSegmentsDialog
                                isMultiple={someChecked}
                                onConfirm={() => deleteSegments([it.id])} />
                            <Button
                                className="opacity-50 hover:opacity-100"
                                variant="ghost"
                                title="Move segment up">
                                <SquareArrowUp />
                            </Button>
                            <Button
                                className="opacity-50 hover:opacity-100"
                                variant="ghost"
                                title="Move segment down">
                                <SquareArrowDown />
                            </Button>
                        </TableCell>
                    
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        
    )
    
}

export default SegmentsTable
