import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import useGanttChartViewModel from './GanttChartViewModel'
import { format, differenceInDays } from 'date-fns'
import { GripHorizontal } from 'lucide-react'
import { cn } from '@repo/shared/utils'
import { GanttChartItemPrimitive } from '@repo/shared/types'

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
    
    // Calculate the minimum width needed based on number of days
    const minWidth = Math.max(800, vm.days.length * 50) // Ensure at least 50px per day
    
    return (
        
        <div className="p-6 bg-white rounded-lg shadow-lg overflow-x-auto" onMouseLeave={() => {
            setHoveredCol(null)
            setHoveredRow(null)
        }}>
            
            <div style={{ minWidth: `${minWidth}px` }}>
                
                {/* Header with dates */}
                <div className="flex border-b">
                    <div className="w-48 shrink-0" />
                    {vm.days.map((day, dayIndex) => (
                        <div
                            key={day.toISOString()}
                            className={cn('flex-1 px-2 py-1 text-sm text-center border-l', {
                                'bg-gray-100': hoveredCol === dayIndex,
                            })}
                            onMouseEnter={() => setHoveredCol(dayIndex)}>
                            {format(day, 'MMM d')}
                        </div>
                    ))}
                </div>
                
                <div ref={vm.timelineRef} onDragOver={vm.handleDragOver}>
                    {/* Tasks */}
                    {vm.items.map((it, itemIndex) => {
                        // console.log('gantt', it)
                        // Calculate the day index where this task starts
                        const startDayIndex = Math.max(0, differenceInDays(it[startDateKey] as number | Date, vm.days[0]))
                        // Calculate task duration in days
                        const taskDuration = differenceInDays(it[endDateKey] as number | Date, it[startDateKey] as number | Date) + 1
                        
                        // Calculate percentage values for positioning
                        const taskStart = (startDayIndex / vm.days.length) * 100
                        const taskWidth = Math.max(1, (taskDuration / vm.days.length) * 100)
                        
                        return (
                            
                            <div
                                key={it.id}
                                className={cn('flex items-center border-b', {
                                    'bg-gray-100': hoveredRow === itemIndex,
                                })}
                                onMouseEnter={() => setHoveredRow(itemIndex)}>
                                
                                <div className="w-48 shrink-0 p-2 font-medium">
                                    {it.name}
                                </div>
                                
                                <div
                                    className="grow relative h-10 flex items-center">
                                    {vm.days.map((day, dayIndex) => (
                                        <div
                                            key={day.toISOString()}
                                            className={cn('flex-1 h-full border-l', {
                                                'bg-gray-100': hoveredCol === dayIndex,
                                            })}
                                            onMouseEnter={() => setHoveredCol(dayIndex)} />
                                    ))}
                                    
                                    <div
                                        className={`absolute h-8 ${it.color ?? ''} rounded flex items-center cursor-move
                                            ${vm.draggedTask === it.id ? 'opacity-50' : ''}`}
                                        style={{
                                            left: `${taskStart}%`,
                                            width: `${taskWidth}%`,
                                        }}
                                        draggable
                                        onDragStart={e => vm.handleDragStart(e, it.id)}
                                        onDragEnd={vm.handleDragEnd}>
                                        
                                        {/* Resize handles */}
                                        <div
                                            className="absolute left-0 w-2 h-full cursor-ew-resize hover:bg-black/10"
                                            onMouseDown={() => vm.setResizeTask({ id: it.id, edge: 'start' })} />
                                        
                                        <div className="grow px-2 text-white text-sm truncate flex items-center">
                                            <GripHorizontal className="w-4 h-4 mr-1" />
                                            {onRenderName ? onRenderName(it.name, it) : it.name}
                                        </div>
                                        
                                        <div
                                            className="absolute right-0 w-2 h-full cursor-ew-resize hover:bg-black/10"
                                            onMouseDown={() => vm.setResizeTask({ id: it.id, edge: 'end' })} />
                                    
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
