import { useWireValue } from '@forminator/react-wire'
import { ID, ItemWithId, Segment } from '@repo/shared/types'
import dayjs from 'dayjs'
import {
    BedDouble,
    CalendarCheck,
    CalendarRange,
    Check,
    CheckCheck,
    Clock,
    Globe, MapPinPlus,
    Plane,
    SquareArrowDown,
    SquareArrowUp,
} from 'lucide-react'
import { useCallback } from 'react'

import ConfirmDeleteSegmentsDialog from '@/components/dialogs/ConfirmDeleteSegmentsDialog'
import DatePicker from '@/components/inputs/DatePicker'
import EditableTextField from '@/components/inputs/EditableTextField'
import TailwindPrimaryColorPicker from '@/components/inputs/TailwindPrimaryColorPicker'
import useSegmentActionsViewModel from '@/components/Navbar/SegmentActionsViewModel'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import useCheckItems from '@/hooks/useCheckItems'
import * as store from '@/store'

interface SegmentsTableProps {
    segments: Segment[]
    updateSegment: (id: ID, field: keyof Segment) => (e: string | number | boolean | Date | undefined) => Promise<void>
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
    
    const currentTrip = useWireValue(store.currentTrip)
    const currentPlan = useWireValue(store.currentPlan)
    
    const {
        checked,
        anyChecked,
        allChecked,
        someChecked,
        hasChecked,
        toggleChecked,
        toggleAllChecked,
    } = useCheckItems(segments as ItemWithId[])
    
    const segmentActionsViewModel = useSegmentActionsViewModel(currentTrip, currentPlan)
    
    const updateCheckedSegments = useCallback((field: keyof Segment) => async (e: boolean) => {
        
        if (!anyChecked)
            return console.warn('updateCheckedSegments called, but no segments checked')
        
        await Promise.all(Array.from(checked)
            .map(it => updateSegment(it, field)(e)))
        
    }, [checked, anyChecked, updateSegment])
    
    return (
        
        <table className="table-auto min-w-full text-sm">
            
            <thead className="bg-surface-container-low text-left text-xs 
                uppercase tracking-[0.18em] text-muted-foreground">
                <tr>
                    <th className="px-4 py-3 font-medium w-5">
                        <Checkbox
                            checked={allChecked ? true : someChecked ? 'indeterminate' : false}
                            onCheckedChange={checked => toggleAllChecked(checked === true)} />
                    </th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Start Date</th>
                    <th className="px-4 py-3 font-medium">End Date</th>
                    <th className="px-4 py-3 font-medium">
                        <div className="flex items-center justify-center">
                            <div className="
                             mx-auto size-6 rounded-full 
                             bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 opacity-60"
                            title="Segment Color" />
                        </div>
                    </th>
                    <th className="px-4 py-3 font-medium">
                        <div title="Segment Days" className="flex items-center justify-center">
                            <CalendarCheck className="mx-auto" />
                        </div>
                    </th>
                    <th className="px-4 py-3 font-medium">
                        <div title="Cumulative Days" className="flex items-center justify-center">
                            <CalendarRange className="mx-auto" />
                        </div>
                    </th>
                    <th className="px-4 py-3 font-medium">
                        <div title="Flight Booked" className="flex items-center justify-center">
                            <Plane />
                        </div>
                    </th>
                    <th className="px-4 py-3 font-medium">
                        <div title="Stay Booked" className="flex items-center justify-center">
                            <BedDouble />
                        </div>
                    </th>
                    <th className="px-4 py-3 font-medium">
                        <div title="Shengen Region" className="flex items-center justify-center">
                            <Globe size="1.5rem" />
                        </div>
                    </th>
                    <th className="px-4 py-3 font-medium w-5">
                        <div className="
                         flex items-center justify-center"
                        title="Segment completed, planned, or pending">
                            <Clock size="1.5rem" />
                        </div>
                    </th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
                {anyChecked && (
                    <tr>
                        <td className="px-4 py-3">&nbsp;</td>
                        <td className="px-4 py-3">&nbsp;</td>
                        <td className="px-4 py-3">&nbsp;</td>
                        <td className="px-4 py-3">&nbsp;</td>
                        <td className="px-4 py-3">
                            <div className="flex flex-col items-center justify-center 
                                border border-slate-400 rounded-md">
                                <TailwindPrimaryColorPicker
                                    value="bg-rainbow-right"
                                    onChange={updateCheckedSegments('color')} />
                            </div>
                        </td>
                        <td className="px-4 py-3">&nbsp;</td>
                        <td className="px-4 py-3">&nbsp;</td>
                        <td className="px-4 py-3">&nbsp;</td>
                        <td className="px-4 py-3">&nbsp;</td>
                        <td className="px-4 py-3">&nbsp;</td>
                        <td className="px-4 py-3">
                            <ConfirmDeleteSegmentsDialog
                                className={anyChecked ? '' : 'hidden'}
                                isMultiple={anyChecked}
                                disabled={!anyChecked}
                                onConfirm={() => deleteSegments(Array.from(checked))} />
                        </td>
                    </tr>
                )}
            </thead>
            <tbody className="divide-y divide-border/60">
                {segments.map((it, i) => (
                    <tr
                        key={it.id}
                        data-id={it?.id}
                        className={dayjs(it.startDate as Date)
                            .isAfter(dayjs(it.endDate as Date)) ? 'border border-red-500' : ''}>
                        
                        <td className="px-4 py-3 w-5">
                            <Checkbox
                                checked={hasChecked(it.id)}
                                onCheckedChange={() => toggleChecked(it.id)} />
                        </td>
                        
                        <td className="px-4 py-3 min-w-40 font-medium">
                            <EditableTextField
                                value={it.name || ''}
                                placeholder="New segment"
                                as="h5"
                                onChange={updateSegment(it.id, 'name')} />
                        </td>
                        
                        <td className="px-4 py-3">
                            <DatePicker
                                buttonClassName="
                                  !p-0 border-b border-secondary rounded-none 
                                  hover:no-underline hover:border-primary"
                                buttonVariant="link"
                                date={it.startDate as Date || Date.now()}
                                onSelect={updateSegment(it.id, 'startDate')} />
                        </td>
                        
                        <td className="px-4 py-3">
                            <DatePicker
                                buttonClassName="
                                  !p-0 border-b border-secondary rounded-none 
                                  hover:no-underline hover:border-primary"
                                buttonVariant="link"
                                date={it.endDate as Date || Date.now()}
                                onSelect={updateSegment(it.id, 'endDate')} />
                        </td>
                        
                        <td className="px-4 py-3">
                            <div className="
                             flex flex-col items-center justify-center 
                             border border-secondary rounded-md">
                                <TailwindPrimaryColorPicker
                                    value={it.color}
                                    onChange={updateSegment(it.id, 'color')} />
                            </div>
                        </td>
                        
                        <td className="px-4 py-3 text-center">
                            {getTotalDaysPerSegment(it)}
                        </td>
                        
                        <td className="px-4 py-3 text-center">
                            {getCumulativeDaysPerSegment(i)}
                        </td>
                        
                        <td className="px-4 py-3">
                            <Switch
                                checked={it.flightBooked}
                                onCheckedChange={updateSegment(it.id, 'flightBooked')} />
                        </td>
                        
                        <td className="px-4 py-3">
                            <Switch
                                checked={it.stayBooked}
                                onCheckedChange={updateSegment(it.id, 'stayBooked')} />
                        </td>
                        
                        <td className="px-4 py-3">
                            <Switch
                                checked={it.isShengenRegion}
                                onCheckedChange={updateSegment(it.id, 'isShengenRegion')} />
                        </td>
                        
                        <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center">
                                {getSegmentCompleted(it)
                                    ? <CheckCheck className="text-emerald-500" />
                                    : getSegmentPlanned(it)
                                        ? <CheckCheck className="text-gray-500" />
                                        : <Check className="text-orange-500" />}
                            </div>
                        </td>
                        
                        <td className="px-4 py-3">
                            <div className="flex items-center justify-center space-x-2">
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
                            </div>
                        </td>
                    </tr>
                ))}
                
                <tr>
                    <td className="px-4 py-3 w-5" colSpan={12}>
                        <Button
                            variant="outline"
                            onClick={() => segmentActionsViewModel.addSegment(true)}>
                            <MapPinPlus className="text-green-500" />
                            Add a new segment
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table>
        
    )
    
}

export default SegmentsTable
