import { GanttChartItemPrimitive } from '@repo/shared/types'
import type { IApi, ITask } from '@svar-ui/react-gantt'
import { differenceInDays } from 'date-fns'
import { type Dispatch, RefObject, type SetStateAction, useCallback, useEffect, useMemo, useRef } from 'react'

import useDarkMode from '@/hooks/useDarkMode'

export interface GanttChartSharedProps<T extends GanttChartItemPrimitive> {
    items: T[]
    setItems: Dispatch<SetStateAction<T[]>>
    startDateKey: string & keyof T
    endDateKey: string & keyof T
}

export type TGanttChartViewModel = {
    // Refs
    ganttRef: RefObject<IApi | null>
    
    // Global State
    isDarkMode: boolean
    
    // Memos
    svarTasks: any[]
}

const useGanttChartViewModel = <T extends GanttChartItemPrimitive>({
    items,
    setItems,
    startDateKey,
    endDateKey,
}: GanttChartSharedProps<T>): TGanttChartViewModel => {
    
    const ganttRef = useRef<IApi | null>(null)
    
    const isDarkMode = useDarkMode()
    
    // Convert our items to Svar Gantt format
    const svarTasks = useMemo(() => items.map(item => {
        
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
        
    }), [items, startDateKey, endDateKey])
    
    const handleUpdateTask = useCallback((task: ITask | null, event: any) => {
        
        if (!task || !task.start || !task.end)
            return
        
        const start = task.start
        const end = task.end
        
        setItems(prev => prev.map(item =>
            item.id === event.id
                ? {
                    ...item,
                    name: task.text,
                    [startDateKey]: start.getTime(),
                    [endDateKey]: end.getTime(),
                } as T
                : item,
        ))
        
    }, [])
    
    const handleDragTask = useCallback((task: ITask | null, event: any) => {
        
        // Only update when the drag is complete
        if (event.inProgress) return
        
        if (!task || !task.start || !task.end)
            return
        
        const start = task.start
        const end = task.end
        
        setItems(prev => prev.map(item =>
            item.id === event.id
                ? {
                    ...item,
                    name: task.text,
                    [startDateKey]: start.getTime(),
                    [endDateKey]: end.getTime(),
                } as T
                : item,
        ))
        
    }, [])
    
    const handleAddTask = useCallback((event: any) => {
        
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
        
    }, [])
    
    const handleDeleteTask = useCallback((event: any) => {
        
        const { id } = event
        
        setItems(prevItems => prevItems.filter(item => item.id !== id))
        
    }, [])
    
    useEffect(() => {
        
        const api = ganttRef.current
        
        if (!api) return
        
        api.on(
            'update-task',
            e => handleUpdateTask(api.getTask(e.id), e),
            { tag: 'update-task' },
        )
        api.on(
            'drag-task',
            e => handleDragTask(api.getTask(e.id), e),
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
    
    return {
        
        // Refs
        ganttRef,
        
        // Global State
        isDarkMode,
        
        // Memos
        svarTasks,
        
    }
    
}

export default useGanttChartViewModel
