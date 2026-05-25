import { GanttChartItemPrimitive, ID } from '@repo/shared/types'
import { /* format, */ addDays, differenceInDays,eachDayOfInterval, startOfDay } from 'date-fns'
import { DragEvent, useCallback, useEffect, useRef, useState } from 'react'

import { GanttChartSharedProps } from '@/components/GanttChart/GanttChart'

type ResizeTask = {
    id: ID
    edge: 'start' | 'end'
}

const GanttChartViewModel = <T extends GanttChartItemPrimitive>(props: GanttChartSharedProps<T>) => {
    
    const {
        items = [],
        setItems,
        startDateKey,
        endDateKey,
    } = props
    
    const timelineRef = useRef<HTMLDivElement>(null)
    
    const [draggedTask, setDraggedTask] = useState<ID | null>(null)
    const [resizeTask, setResizeTask] = useState<ResizeTask | null>(null)
    
    /* // Calculate date range for the chart
    const startDate = new Date(Math.min(...items.map(task => getTime(task.startDate))))
    const endDate = new Date(Math.max(...items.map(task => getTime(task.endDate))))
    const days = eachDayOfInterval({ start: startDate, end: endDate }) */
    
    const toMs = (v: Date | number): number => {
        if (!v)
            throw new Error('toMs: invalid input')
        if (v instanceof Date) return v.getTime()
        if (typeof v === 'number') return v < 1e12 ? v * 1000 : v
        const parsed = new Date(v)
        
        if (isNaN(parsed.getTime()))
            throw new Error('toMs: result was NaN')
        
        return parsed.getTime()
    }
    
    const startDate = items.length > 0
        ? new Date(Math.min(...items.map(it => toMs(it[startDateKey] as number | Date))))
        : new Date() // Default start date if no items
    const endDate = items.length > 0
        ? new Date(Math.max(...items.map(it => toMs(it[endDateKey] as number | Date))))
        : addDays(startDate, 7) // Default end date if no items
    const days = eachDayOfInterval({ start: startDate, end: endDate })
    
    /**
     * Get the date from the mouse position
     */
    const getDateFromPosition = useCallback((clientX: number): Date | null => {
        
        if (!timelineRef.current) return null
        
        const rect = timelineRef.current.getBoundingClientRect()
        const relativeX = clientX - rect.left
        
        // Calculate exact position within the timeline as a percentage
        const positionPercent = relativeX / rect.width
        
        // Get the day index by multiplying the percentage by total days
        const exactDayIndex = positionPercent * (days.length - 1)
        const dayIndex = Math.round(exactDayIndex)
        
        // Ensure we stay within bounds
        if (dayIndex >= 0 && dayIndex < days.length)
            return days[dayIndex]
        
        return days[Math.max(0, Math.min(dayIndex, days.length - 1))]
        
    }, [days])
    
    /**
     * Handle the drag start event
     */
    const handleDragStart = (_: DragEvent, itemId: ID) => {
        
        setDraggedTask(itemId)
        
    }
    
    /**
     * Handle the drag over event
     */
    const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        if (!draggedTask) return
        
        const task = items.find(t => t.id === draggedTask)
        
        if (!task) return
        
        const date = getDateFromPosition(e.clientX)
        
        if (!date) return
        
        const duration = differenceInDays(
            new Date(toMs(task[endDateKey] as number | Date)),
            new Date(toMs(task[startDateKey] as number | Date)),
        )
        const newStartDate = startOfDay(date)
        const newEndDate = addDays(newStartDate, duration)
        
        setItems(items.map(t =>
            t.id === draggedTask
                ? { ...t, startDate: newStartDate, endDate: newEndDate }
                : t,
        ))
    }
    
    const handleDragEnd = () => {
        
        setDraggedTask(null)
        setResizeTask(null)
        
    }
    
    useEffect(() => {
        
        if (!resizeTask) return
        
        const handleMouseMove = (e: MouseEvent) => {
            const date = getDateFromPosition(e.clientX)
            
            if (!date) return
            
            setItems((prevItems: T[]) =>
                prevItems.map(t => {
                    if (t.id === resizeTask.id) {
                        if (resizeTask.edge === 'start') {
                            if (date >= new Date(toMs(t[endDateKey] as number | Date))) return t
                            return { ...t, startDate: startOfDay(date) }
                        } else {
                            if (date <= new Date(toMs(t[startDateKey] as number | Date))) return t
                            return { ...t, endDate: startOfDay(date) }
                        }
                    }
                    
                    return t
                }),
            )
        }
        
        const handleMouseUp = () => {
            setResizeTask(null)
        }
        
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [endDateKey, getDateFromPosition, resizeTask, setItems, startDateKey])
    
    return {
        
        // Refs
        timelineRef,
        
        // State
        items,
        setItems,
        draggedTask,
        setDraggedTask,
        resizeTask,
        setResizeTask,
        
        // Memos
        startDate,
        endDate,
        days,
        
        // Actions
        getDateFromPosition,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        
    }
    
}

export default GanttChartViewModel
