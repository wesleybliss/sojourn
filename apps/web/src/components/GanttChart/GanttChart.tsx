/* eslint-disable @stylistic/max-len */
import { GanttChartItemPrimitive } from '@repo/shared/types'
import { cn } from '@repo/shared/utils'
import { differenceInDays, format, isSameDay } from 'date-fns'
import { GripHorizontal } from 'lucide-react'
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'

import useGanttChartViewModel from './GanttChartViewModel'

export interface GanttChartSharedProps<T extends GanttChartItemPrimitive> {
    items: T[]
    setItems: Dispatch<SetStateAction<T[]>>
    startDateKey: string & keyof T
    endDateKey: string & keyof T
}

export interface GanttChartProps<T extends GanttChartItemPrimitive> extends GanttChartSharedProps<T> {
    onRenderName?: (name: string, item: T) => ReactNode
}

const GanttChart = <T extends GanttChartItemPrimitive,>({
    items,
    setItems,
    startDateKey,
    endDateKey,
    onRenderName,
}: GanttChartProps<T>) => {
    
    const [hoveredRow, setHoveredRow] = useState<number | null>(null)
    const [hoveredCol, setHoveredCol] = useState<number | null>(null)
    
    const vm = useGanttChartViewModel<T>({
        items,
        setItems,
        startDateKey,
        endDateKey,
    })
    
    const minWidth = Math.max(960, vm.days.length * 58)
    
    const todayIndex = useMemo(() => vm.days.findIndex(day => isSameDay(day, new Date())), [vm.days])
    
    return (
        
        <div
            className="overflow-x-auto rounded-[26px] border border-border/70 bg-surface-container-lowest"
            onMouseLeave={() => {
                setHoveredCol(null)
                setHoveredRow(null)
            }}>
            <div className="relative" style={{ minWidth: `${minWidth}px` }}>
                <div className="grid grid-cols-[220px_minmax(0,1fr)] border-b border-border/70 bg-surface-container-low">
                    <div className="px-5 py-4">
                        <div className="eyebrow">Segments</div>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: `repeat(${vm.days.length}, minmax(58px, 1fr))` }}>
                        {vm.days.map((day, dayIndex) => (
                            <div
                                className={cn(
                                    'border-l border-border/70 px-2 py-4 text-center',
                                    hoveredCol === dayIndex && 'bg-surface-container',
                                    todayIndex === dayIndex && 'bg-rose-50 dark:bg-rose-950/25',
                                )}
                                key={day.toISOString()}
                                onMouseEnter={() => setHoveredCol(dayIndex)}>
                                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                                    {format(day, 'EEE')}
                                </div>
                                <div className="mt-1 text-sm font-medium">{format(day, 'MMM d')}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="relative" ref={vm.timelineRef} onDragOver={vm.handleDragOver}>
                    {todayIndex >= 0 && (
                        <div
                            className="pointer-events-none absolute bottom-0 top-0 z-10 flex flex-col items-center"
                            style={{
                                left: `calc(220px + (${todayIndex} * (100% - 220px) / ${Math.max(vm.days.length, 1)}))`,
                                width: `calc((100% - 220px) / ${Math.max(vm.days.length, 1)})`,
                            }}>
                            <span className="mt-2 rounded-full bg-rose-500 px-2 py-1 text-[10px] font-semibold tracking-[0.18em] text-white">
                                TODAY
                            </span>
                            <div className="mt-2 h-full border-l border-dashed border-rose-500" />
                        </div>
                    )}
                    
                    {vm.items.map((item, itemIndex) => {
                        const startDayIndex = Math.max(
                            0,
                            differenceInDays(item[startDateKey] as number | Date, vm.days[0]),
                        )
                        const taskDuration = differenceInDays(
                            item[endDateKey] as number | Date,
                            item[startDateKey] as number | Date,
                        ) + 1
                        const taskStart = (startDayIndex / vm.days.length) * 100
                        const taskWidth = Math.max(1, (taskDuration / vm.days.length) * 100)
                        
                        return (
                            
                            <div
                                className={cn(
                                    'grid grid-cols-[220px_minmax(0,1fr)] border-b border-border/50 last:border-b-0',
                                    hoveredRow === itemIndex && 'bg-surface-container-low/70',
                                )}
                                key={item.id}
                                onMouseEnter={() => setHoveredRow(itemIndex)}>
                                <div className="flex min-h-14 items-center px-5 py-3">
                                    <div className="min-w-0">
                                        <div className="truncate font-medium">{item.name}</div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            {format(item[startDateKey] as Date, 'MMM d')} - {format(item[endDateKey] as Date, 'MMM d')}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="relative flex min-h-14 items-center">
                                    <div
                                        className="absolute inset-0 grid"
                                        style={{ gridTemplateColumns: `repeat(${vm.days.length}, minmax(58px, 1fr))` }}>
                                        {vm.days.map((day, dayIndex) => (
                                            <div
                                                className={cn(
                                                    'border-l border-border/60',
                                                    hoveredCol === dayIndex && 'bg-surface-container',
                                                    todayIndex === dayIndex && 'bg-rose-50/60 dark:bg-rose-950/10',
                                                )}
                                                key={day.toISOString()}
                                                onMouseEnter={() => setHoveredCol(dayIndex)} />
                                        ))}
                                    </div>
                                    
                                    <div
                                        className={cn(
                                            'absolute z-20 flex h-9 items-center rounded-full bg-primary text-primary-foreground shadow-md',
                                            vm.draggedTask === item.id && 'opacity-50',
                                        )}
                                        draggable
                                        onDragEnd={vm.handleDragEnd}
                                        onDragStart={event => vm.handleDragStart(event, item.id)}
                                        style={{
                                            left: `${taskStart}%`,
                                            width: `${taskWidth}%`,
                                        }}>
                                        <div
                                            className="absolute left-0 h-full w-3 cursor-ew-resize rounded-l-full hover:bg-black/10"
                                            onMouseDown={() => vm.setResizeTask({ id: item.id, edge: 'start' })} />
                                        <div className="flex min-w-0 grow items-center gap-2 px-3 text-sm">
                                            <GripHorizontal className="size-4 shrink-0 opacity-70" />
                                            <span className="truncate">
                                                {onRenderName ? onRenderName(item.name, item) : item.name}
                                            </span>
                                        </div>
                                        <div
                                            className="absolute right-0 h-full w-3 cursor-ew-resize rounded-r-full hover:bg-black/10"
                                            onMouseDown={() => vm.setResizeTask({ id: item.id, edge: 'end' })} />
                                    </div>
                                </div>
                            </div>
                            
                        )
                    })}
                </div>
            </div>
        </div>
        
    )
    
}

export default GanttChart
