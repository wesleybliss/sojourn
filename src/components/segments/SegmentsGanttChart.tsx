import { useMemo } from 'react'
import GanttChart from '@/components/GanttChart'
import { calculateTotalDays } from '@/utils'
import dayjs from 'dayjs'
import { Plan } from '@/types'

interface SegmentsGanttChartProps {
    plan: Plan
}

const SegmentsGanttChart = ({
    plan,
}: SegmentsGanttChartProps) => {
    
    const segments = useMemo(() => plan?.segments || [], [plan])
    
    /** @type GanttChartItem[] */
    const items = useMemo(() => {
        
        if (!segments || segments.length <= 0)
            return null
        
        return segments.map(it => ({
            id: it.id,
            name: it.name,
            startDate: dayjs(it.startDate).toDate(),
            endDate: dayjs(it.endDate).toDate(),
            color: it.color,
            totalDays: calculateTotalDays(it.startDate, it.endDate).totalDays,
        }))
        
    }, [segments])
    
    if (!items?.length) return null
    
    /* <GanttChart
            items={items}
            setItems={() => {}}
            onRenderName={(name, item) => `${name} (${item.totalDays})`}/> */
    
    return (
        
        <GanttChart
            items={items}
            setItems={() => {}}
            onRenderName={(name, item) => (
                <span>
                    {name} <span className="text-xs">({item.totalDays})</span>
                </span>
            )} />
        
    )
    
}

export default SegmentsGanttChart
