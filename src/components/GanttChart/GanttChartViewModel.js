import { useState, useRef, useEffect } from 'react'
import { /* format, */ addDays, eachDayOfInterval, startOfDay, differenceInDays } from 'date-fns'

const GanttChartViewModel = (
    items = [],
    setItems,
) => {
    
    const timelineRef = useRef(null)
    
    const [draggedTask, setDraggedTask] = useState(null)
    const [resizeTask, setResizeTask] = useState(null)
    
    /* // Calculate date range for the chart
    const startDate = new Date(Math.min(...items.map(task => getTime(task.startDate))))
    const endDate = new Date(Math.max(...items.map(task => getTime(task.endDate))))
    const days = eachDayOfInterval({ start: startDate, end: endDate }) */
    
    const toMs = v => {
        if (v == null) return null
        if (v instanceof Date) return v.getTime()
        if (typeof v === 'number') return v < 1e12 ? v * 1000 : v
        const parsed = new Date(v)
        return isNaN(parsed.getTime()) ? null : parsed.getTime()
    }

    const startDate = items.length > 0
        ? new Date(Math.min(...items.map(it => toMs(it.startDate))))
        : new Date() // Default start date if no items
    const endDate = items.length > 0
        ? new Date(Math.max(...items.map(it => toMs(it.endDate))))
        : addDays(startDate, 7) // Default end date if no items
    const days = eachDayOfInterval({ start: startDate, end: endDate })
    
    /**
     * Get the date from the mouse position
     * 
     * @param {number} clientX - The X coordinate of the mouse event
     * @returns {Date|null} - The date corresponding to the mouse position or null if out of bounds
     */
    const getDateFromPosition = clientX => {
        
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
        
    }
    
    /**
     * Handle the drag start event
     * 
     * @param {React.DragEvent} e - The drag event
     * @param {string} itemId - The ID of the task being dragged
     */
    const handleDragStart = (e, itemId) => {
        
        setDraggedTask(itemId)
        
    }
    
    /**
     * Handle the drag over event
     * 
     * @param {React.DragEvent} e - The drag event
     * @returns 
     */
    const handleDragOver = e => {
        e.preventDefault()
        if (!draggedTask) return
        
        const task = items.find(t => t.id === draggedTask)
        
        if (!task) return
        
        const date = getDateFromPosition(e.clientX)
        
        if (!date) return
        
        const duration = differenceInDays(new Date(toMs(task.endDate)), new Date(toMs(task.startDate)))
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
        
        const handleMouseMove = e => {
            const date = getDateFromPosition(e.clientX)
            
            if (!date) return
            
            setItems(prevItems =>
                prevItems.map(t => {
                    if (t.id === resizeTask.id) {
                        if (resizeTask.edge === 'start') {
                            if (date >= new Date(toMs(t.endDate))) return t
                            return { ...t, startDate: startOfDay(date) }
                        } else {
                            if (date <= new Date(toMs(t.startDate))) return t
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
    }, [resizeTask])
    
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
