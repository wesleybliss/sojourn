import { useMemo } from 'react'
import GanttChart from '@/components/GanttChart'
import { calculateTotalDays } from '@repo/shared/utils'
import dayjs from 'dayjs'
import { Plan, SegmentGanttChart } from '@repo/shared/types'

interface SegmentsGanttChartProps {
    plan: Plan
}

const SegmentsGanttChart = ({
    plan,
}: SegmentsGanttChartProps) => {
    
    const segments = useMemo(() => plan?.segments || [], [plan])
    
    const items = useMemo<SegmentGanttChart[] | null>(() => {
        
        if (!segments || segments.length <= 0)
            return null
        
        return segments.map<SegmentGanttChart>(it => ({
            id: it.id,
            name: it.name,
            startDate: dayjs(it.startDate as Date).toDate(),
            endDate: dayjs(it.endDate as Date).toDate(),
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
            startDateKey="startDate"
            endDateKey="endDate"
            onRenderName={(name, item) => (
                <span>
                    {name} <span className="text-xs">({item.totalDays})</span>
                </span>
            )} />
        
    )
    
}

export default SegmentsGanttChart
