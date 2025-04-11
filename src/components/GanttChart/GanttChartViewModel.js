import { useState, useRef } from 'react'
import { /* format, */ addDays, eachDayOfInterval, startOfDay, differenceInDays } from 'date-fns'

/** @type GanttChartItem[] */
export const sampleItems = [
    {
        id: '1',
        name: 'Project Planning',
        startDate: new Date(2024, 2, 1),
        endDate: new Date(2024, 2, 5),
        color: 'bg-blue-500',
    },
    {
        id: '2',
        name: 'Design Phase',
        startDate: new Date(2024, 2, 3),
        endDate: new Date(2024, 2, 8),
        color: 'bg-green-500',
    },
    {
        id: '3',
        name: 'Development',
        startDate: new Date(2024, 2, 6),
        endDate: new Date(2024, 2, 15),
        color: 'bg-purple-500',
    },
]

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
    
    const startDate = items.length > 0
        ? new Date(Math.min(...items.map(it => it.startDate.getTime())))
        : new Date() // Default start date if no items
    const endDate = items.length > 0
        ? new Date(Math.max(...items.map(it => it.endDate.getTime())))
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
        const totalDays = differenceInDays(days[days.length - 1], days[0]) + 1
        
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
        
        if (!draggedTask && !resizeTask) return
        
        const task = items.find(t => t.id === (draggedTask || resizeTask?.id))
        
        if (!task) return
        
        const date = getDateFromPosition(e.clientX)
        
        if (!date) return
        
        if (draggedTask) {
            
            // Preserve the duration in days
            const duration = differenceInDays(task.endDate, task.startDate)
            // Ensure we use start of day for consistent positioning
            const newStartDate = startOfDay(date)
            // Calculate new end date based on the same duration
            const newEndDate = addDays(newStartDate, duration)
            
            setItems(items.map(t => {
                
                if (t.id === draggedTask)
                    return {
                        ...t,
                        startDate: newStartDate,
                        endDate: newEndDate,
                    }
                
                return t
                
            }))
            
        } else if (resizeTask) {
            
            setItems(items.map(t => {
                
                if (t.id === resizeTask.id) {
                    // Handle resize from start edge
                    if (resizeTask.edge === 'start') {
                        // Don't allow start date to be after end date
                        if (date >= t.endDate) return t
                        
                        return {
                            ...t,
                            // Ensure we use start of day for consistent positioning
                            startDate: startOfDay(date),
                        }
                    } 
                    // Handle resize from end edge
                    else {
                        // Don't allow end date to be before start date
                        if (date <= t.startDate) return t
                        
                        return {
                            ...t,
                            // When setting end date, use the end of day
                            // to ensure the bar includes the full day
                            endDate: startOfDay(date),
                        }
                    }
                }
                
                return t
                
            }))
            
        }
        
    }
    
    const handleDragEnd = () => {
        
        setDraggedTask(null)
        setResizeTask(null)
        
    }
    
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
