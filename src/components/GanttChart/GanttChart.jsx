import useGanttChartViewModel from './GanttChartViewModel'
import { format, getTime, differenceInDays } from 'date-fns'
import { GripHorizontal } from 'lucide-react'

const GanttChart = ({
    items,
    setItems,
}) => {
    
    const vm = useGanttChartViewModel(items, setItems)
    
    // Calculate the minimum width needed based on number of days
    const minWidth = Math.max(800, vm.days.length * 50) // Ensure at least 50px per day
    
    return (
        
        <div className="p-6 bg-white rounded-lg shadow-lg overflow-x-auto">
            
            <div style={{ minWidth: `${minWidth}px` }}>
                
                {/* Header with dates */}
                <div className="flex border-b">
                    <div className="w-48 flex-shrink-0" />
                    {vm.days.map(day => (
                        <div
                            key={day.toISOString()}
                            className="flex-1 px-2 py-1 text-sm text-center border-l">
                            {format(day, 'MMM d')}
                        </div>
                    ))}
                </div>
                
                {/* Tasks */}
                {vm.items.map(it => {
                    
                    // Calculate the day index where this task starts
                    const startDayIndex = Math.max(0, differenceInDays(it.startDate, vm.days[0]))
                    // Calculate task duration in days
                    const taskDuration = differenceInDays(it.endDate, it.startDate)
                    
                    // Calculate percentage values for positioning
                    const taskStart = (startDayIndex / vm.days.length) * 100
                    const taskWidth = Math.max(1, (taskDuration / vm.days.length) * 100)
                    
                    return (
                        
                        <div key={it.id} className="flex items-center border-b">
                            
                            <div className="w-48 flex-shrink-0 p-2 font-medium">
                                {it.name}
                            </div>
                            
                            <div
                                ref={vm.timelineRef}
                                className="flex-grow relative h-12 flex items-center"
                                onDragOver={vm.handleDragOver}>
                                {vm.days.map(day => (
                                    <div
                                        key={day.toISOString()}
                                        className="flex-1 h-full border-l" />
                                ))}
                                
                                <div
                                    className={`absolute h-8 ${it.color} rounded-lg flex items-center cursor-move
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
                                    
                                    <div className="flex-grow px-2 text-white text-sm truncate flex items-center">
                                        <GripHorizontal className="w-4 h-4 mr-1" />
                                        {it.name}
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
        
    )
    
}

export default GanttChart
