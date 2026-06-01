import '@svar-ui/react-gantt/all.css'

import { GanttChartItemPrimitive } from '@repo/shared/types'
import { Fullscreen } from '@svar-ui/react-core'
import { Gantt } from '@svar-ui/react-gantt'
import { Maximize2, Minimize2 } from 'lucide-react'
import type { ReactNode } from 'react'

import useGanttChartViewModel, { GanttChartSharedProps } from '@/components/GanttChart/useGanttChartViewModel'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'

export interface GanttChartProps<T extends GanttChartItemPrimitive> extends GanttChartSharedProps<T> {
    onRenderName?: (name: string, item: T) => ReactNode
}

const GanttChart = <T extends GanttChartItemPrimitive,>({
    items,
    setItems,
    startDateKey,
    endDateKey,
    enabled = false,
    onRenderName: _onRenderName,
}: GanttChartProps<T>) => {
    
    const vm = useGanttChartViewModel({
        items,
        setItems,
        startDateKey,
        endDateKey,
        enabled,
    })
    
    return (
        
        <div className={cn('flex flex-col gap-2 h-full', {
            'gantt-theme': !vm.isDarkMode,
            'gantt-dark-theme': vm.isDarkMode,
        })}>
            
            <div className="gtcell relative overflow-hidden border-(--wx-gantt-border)">
                
                <Fullscreen
                    hotkey="ctrl+shift+f"
                    toggleButton={(toggle: () => void, isFullScreen: boolean) => (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggle}
                            className="absolute right-4 bottom-4 z-10">
                            {isFullScreen ? <Minimize2 /> : <Maximize2 />}
                        </Button>
                    )}>
                    
                    <Gantt
                        ref={vm.ganttRef}
                        tasks={vm.svarTasks}
                        zoom={true}
                        readonly={!enabled} />
                
                </Fullscreen>
            
            </div>
        
        </div>
        
    )
    
}

export default GanttChart
