import '@svar-ui/react-gantt/all.css'

import { GanttChartItemPrimitive } from '@repo/shared/types'
import { Gantt } from '@svar-ui/react-gantt'
import type { ReactNode } from 'react'

import useGanttChartViewModel, { GanttChartSharedProps } from '@/components/GanttChart/useGanttChartViewModel'

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
    
    const vm = useGanttChartViewModel({
        items,
        setItems,
        startDateKey,
        endDateKey,
    })
    
    return vm.isDarkMode ? (
        <div className="gantt-dark-theme">
            <Gantt ref={vm.ganttRef} tasks={vm.svarTasks} />
        </div>
    ) : (
        <div className="gantt-theme">
            <Gantt ref={vm.ganttRef} tasks={vm.svarTasks} />
        </div>
    )
    
}

export default GanttChart
