import { useMemo } from 'react'
import GanttChart from '@/components/GanttChart'
import { calculateTotalDays } from '@/lib/utils.js'
import dayjs from 'dayjs'

const SegmentsGanttChart = ({
    plan,
}) => {
    
    const segments = useMemo(() => plan?.segments || [], [plan])
    
    /** @type GanttChartItem[] */
    const items = useMemo(() => {
        
        if (!segments || segments.length <= 0)
            return null

        // Filter out segments with invalid dates to avoid creating huge ranges or invalid Date objects
        const valid = segments.filter(s => dayjs(s.startDate).isValid() && dayjs(s.endDate).isValid())
        if (!valid.length) return null

        return valid.map(it => ({
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
