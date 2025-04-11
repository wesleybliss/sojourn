import useGanttChartViewModel from './GanttChartViewModel'
import { format, getTime, differenceInDays } from 'date-fns'
import { GripHorizontal } from 'lucide-react'

const GanttChart = ({
    items,
}) => {
    
    const vm = useGanttChartViewModel(items)
    
    return (
        
        <div className="p-6 bg-white rounded-lg shadow-lg overflow-x-auto">
            
            <div className="min-w-[800px]">
                
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
                
                <div>
                    <p>GanttChart:</p>
                    <pre><code>{JSON.stringify({ items, tasks: vm.tasks }, null, 4)}</code></pre>
                </div>
                
                {/* Tasks */}
                {vm.tasks.map(task => {
                    console.log('ehh', task.endDate, task.startDate)
                    const taskDuration = differenceInDays(task.endDate, task.startDate)
                    const taskStartTime = getTime(task.startDate) - getTime(vm.days[0])
                    const taskEndTime = getTime(vm.days[vm.days.length - 1]) - getTime(vm.days[0])
                    const taskStart = taskStartTime / taskEndTime * 100
                    const taskWidth = (taskDuration / vm.days.length) * 100
                    
                    return (
                        
                        <div key={task.id} className="flex items-center border-b">
                            
                            <div className="w-48 flex-shrink-0 p-2 font-medium">
                                {task.name}
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
                                    className={`absolute h-8 ${task.color} rounded-lg flex items-center cursor-move
                                        ${vm.draggedTask === task.id ? 'opacity-50' : ''}`}
                                    style={{
                                        left: `${taskStart}%`,
                                        width: `${taskWidth}%`,
                                    }}
                                    draggable
                                    onDragStart={e => vm.handleDragStart(e, task.id)}
                                    onDragEnd={vm.handleDragEnd}>
                                    
                                    {/* Resize handles */}
                                    <div
                                        className="absolute left-0 w-2 h-full cursor-ew-resize hover:bg-black/10"
                                        onMouseDown={() => vm.setResizeTask({ id: task.id, edge: 'start' })} />
                                    
                                    <div className="flex-grow px-2 text-white text-sm truncate flex items-center">
                                        <GripHorizontal className="w-4 h-4 mr-1" />
                                        {task.name}
                                    </div>
                                    
                                    <div
                                        className="absolute right-0 w-2 h-full cursor-ew-resize hover:bg-black/10"
                                        onMouseDown={() => vm.setResizeTask({ id: task.id, edge: 'end' })} />
                                
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
