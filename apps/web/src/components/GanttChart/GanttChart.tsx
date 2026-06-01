import '@svar-ui/react-gantt/all.css'

import { GanttChartItemPrimitive } from '@repo/shared/types'
import type { IApi } from '@svar-ui/react-gantt'
import { Gantt } from '@svar-ui/react-gantt'
import { differenceInDays } from 'date-fns'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'

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
    onRenderName: _onRenderName,
}: GanttChartProps<T>) => {
    const ganttRef = useRef<IApi | null>(null)
    
    useEffect(() => {
        const api = ganttRef.current
        if (!api) return
        
        const handleUpdateTask = (event: any) => {
            const { id } = event
            const task = api.getTask(id)
            if (task && task.start && task.end) {
                const start = task.start
                const end = task.end
                setItems(prevItems =>
                    prevItems.map(item =>
                        item.id === id
                            ? {
                                ...item,
                                name: task.text,
                                [startDateKey]: start.getTime(),
                                [endDateKey]: end.getTime(),
                            } as T
                            : item,
                    ),
                )
            }
        }
        
        const handleDragTask = (event: any) => {
            // Only update when the drag is complete
            if (!event.inProgress) {
                const { id } = event
                const task = api.getTask(id)
                if (task && task.start && task.end) {
                    const start = task.start
                    const end = task.end
                    setItems(prevItems =>
                        prevItems.map(item =>
                            item.id === id
                                ? {
                                    ...item,
                                    name: task.text,
                                    [startDateKey]: start.getTime(),
                                    [endDateKey]: end.getTime(),
                                } as T
                                : item,
                        ),
                    )
                }
            }
        }
        
        const handleAddTask = (event: any) => {
            const { task } = event
            setItems(prevItems => [
                ...prevItems,
                {
                    id: task.id,
                    name: task.text,
                    [startDateKey]: task.start?.getTime(),
                    [endDateKey]: task.end?.getTime(),
                    color: task.color,
                } as T,
            ])
        }
        
        const handleDeleteTask = (event: any) => {
            const { id } = event
            setItems(prevItems => prevItems.filter(item => item.id !== id))
        }
        
        api.on(
            'update-task',
            handleUpdateTask,
            { tag: 'update-task' },
        )
        api.on(
            'drag-task',
            handleDragTask,
            { tag: 'drag-task' },
        )
        api.on(
            'add-task',
            handleAddTask,
            { tag: 'add-task' },
        )
        api.on(
            'delete-task',
            handleDeleteTask,
            { tag: 'delete-task' },
        )
        
        return () => {
            api.detach('update-task')
            api.detach('drag-task')
            api.detach('add-task')
            api.detach('delete-task')
        }
    }, [setItems, startDateKey, endDateKey])
    
    // Convert our items to Svar Gantt format
    const svarTasks = items.map(item => {
        const startDate = item[startDateKey] as Date | number
        const endDate = item[endDateKey] as Date | number
        
        const start = startDate instanceof Date ? startDate : new Date(startDate)
        const end = endDate instanceof Date ? endDate : new Date(endDate)
        
        const duration = Math.max(1, differenceInDays(end, start) + 1)
        
        return {
            id: item.id,
            text: item.name,
            start,
            end,
            duration,
            progress: 0,
            type: 'task' as const,
            color: item.color,
        }
    })
    
    return <Gantt ref={ganttRef} tasks={svarTasks} />
}

export default GanttChart