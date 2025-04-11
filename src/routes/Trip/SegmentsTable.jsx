import useCheckItems from '@/hooks/useCheckItems'
import { Checkbox } from '@/components/ui/checkbox'
import EditableTextField from '@/components/EditableTextField'
import {
    Table,
    TableBody,
    // TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import DatePicker from '@/components/DatePicker'
import TailwindPrimaryColorPicker from '@/components/TailwindPrimaryColorPicker'
import ConfirmDeleteSegmentsDialog from './ConfirmDeleteSegmentsDialog'
import { MoveRight } from 'lucide-react'
import dayjs from 'dayjs'

const SegmentsTable = ({
    segments,
    updateSegment,
    deleteSegments,
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
                    <TableHead>{/* Color */}</TableHead>
                    <TableHead>
                        <ConfirmDeleteSegmentsDialog
                            className={anyChecked ? '' : 'hidden'}
                            isMultiple={anyChecked}
                            disabled={!anyChecked}
                            onConfirm={() => deleteSegments(checked)} />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {segments.map(it => (
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
                            <div className="border border-secondary rounded-md">
                                <TailwindPrimaryColorPicker
                                    value={it.color}
                                    onChange={updateSegment(it.id, 'color')} />
                            </div>
                        </TableCell>
                        
                        <TableCell>
                            <ConfirmDeleteSegmentsDialog
                                isMultiple={someChecked}
                                onConfirm={() => deleteSegments([it.id])} />
                        </TableCell>
                    
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        
    )
    
}

export default SegmentsTable
