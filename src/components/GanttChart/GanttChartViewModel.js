import { useState, useRef, useEffect } from 'react'
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

const GanttChartViewModel = ({
    items = [],
} = {}) => {
    
    const timelineRef = useRef(null)
    
    const [tasks, setTasks] = useState(items)
    const [draggedTask, setDraggedTask] = useState(null)
    const [resizeTask, setResizeTask] = useState(null)
    
    /* // Calculate date range for the chart
    const startDate = new Date(Math.min(...tasks.map(task => getTime(task.startDate))))
    const endDate = new Date(Math.max(...tasks.map(task => getTime(task.endDate))))
    const days = eachDayOfInterval({ start: startDate, end: endDate }) */
    
    const startDate = tasks.length > 0
        ? new Date(Math.min(...tasks.map(task => task.startDate.getTime())))
        : new Date() // Default start date if no tasks
    const endDate = tasks.length > 0
        ? new Date(Math.max(...tasks.map(task => task.endDate.getTime())))
        : addDays(startDate, 7) // Default end date if no tasks
    const days = tasks.length > 0
        ? eachDayOfInterval({ start: startDate, end: endDate })
        : eachDayOfInterval({ start: startDate, end: endDate }) // Calculate days based on defaults if no tasks
    
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
        const dayWidth = rect.width / days.length
        const dayIndex = Math.floor(relativeX / dayWidth)
        
        if (dayIndex >= 0 && dayIndex < days.length)
            return days[dayIndex]
        
        return null
        
    }
    
    /**
     * Handle the drag start event
     * 
     * @param {React.DragEvent} e - The drag event
     * @param {string} taskId - The ID of the task being dragged
     */
    const handleDragStart = (e, taskId) => {
        
        setDraggedTask(taskId)
        
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
        
        const task = tasks.find(t => t.id === (draggedTask || resizeTask?.id))
        
        if (!task) return
        
        const date = getDateFromPosition(e.clientX)
        
        if (!date) return
        
        if (draggedTask) {
            
            const duration = differenceInDays(task.endDate, task.startDate)
            const newStartDate = startOfDay(date)
            const newEndDate = addDays(newStartDate, duration)
            
            setTasks(tasks.map(t => {
                
                if (t.id === draggedTask)
                    return {
                        ...t,
                        startDate: newStartDate,
                        endDate: newEndDate,
                    }
                
                return t
                
            }))
            
        } else if (resizeTask) {
            
            setTasks(tasks.map(t => {
                
                if (t.id === resizeTask.id)
                    if (resizeTask.edge === 'start') {
                        return {
                            ...t,
                            startDate: date < t.endDate ? startOfDay(date) : t.startDate,
                        }
                    } else {
                        return {
                            ...t,
                            endDate: date > t.startDate ? startOfDay(date) : t.endDate,
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
    
    useEffect(() => {
        
        // Only update if the passed items are different from the current tasks
        // This check might need refinement depending on how you want to handle updates
        // (e.g., deep comparison if necessary, but often reference check is enough if items array is rebuilt)
        // Also handle the case where items might become null/undefined after being populated
        setTasks(items)
        
        console.log('gantt vm items update', items)
        
    }, [items])
    
    return {
        
        // Refs
        timelineRef,
        
        // State
        tasks,
        setTasks,
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
