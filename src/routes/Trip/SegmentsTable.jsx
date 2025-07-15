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
import ConfirmDeleteSegmentsDialog from './ConfirmDeleteSegmentsDialog'
import { MoveRight, SquareArrowUp, SquareArrowDown, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'

const SegmentsTable = ({
    segments,
    updateSegment,
    deleteSegments,
    getTotalDaysPerSegment,
    getCumulativeDaysPerSegment,
}) => {
    
    const {
        checked,
        anyChecked,
        allChecked,
        someChecked,
        hasChecked,
        toggleChecked,
        toggleAllChecked,
    } = useCheckItems(segments)
    
    const updateCheckedSegments = useCallback(field => async e => {
        
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
                            onCheckedChange={toggleAllChecked} />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>{/* Arrow */}</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>* Days</TableHead>
                    <TableHead>Flight</TableHead>
                    <TableHead>Stay</TableHead>
                    <TableHead>
                        <div className="" title="Shengen Region">
                            <Globe />
                        </div>
                    </TableHead>
                    <TableHead>&nbsp;</TableHead>
                </TableRow>
                {anyChecked && (
                    <TableRow>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead>
                            <div className={cn(
                                'flex flex-col items-center justify-center',
                                'border border-secondary rounded-md',
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
                        className={dayjs(it.startDate).isAfter(dayjs(it.endDate)) ? 'border border-red-500' : ''}>
                        
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
                                date={it.startDate || Date.now()}
                                onSelect={updateSegment(it.id, 'startDate')} />
                        </TableCell>
                        
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <MoveRight className="opacity-30" />
                            </div>
                        </TableCell>
                        
                        <TableCell>
                            <DatePicker
                                buttonClassName="!p-0 border-b border-secondary rounded-none
                                    hover:no-underline hover:border-primary"
                                buttonVariant="link"
                                date={it.endDate || Date.now()}
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
                        
                        <TableCell>
                            <ConfirmDeleteSegmentsDialog
                                isMultiple={someChecked}
                                onConfirm={() => deleteSegments([it.id])} />
                            <Button
                                className="opacity-50 hover:opacity-100"
                                variant="ghost">
                                <SquareArrowUp />
                            </Button>
                            <Button
                                className="opacity-50 hover:opacity-100"
                                variant="ghost">
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
