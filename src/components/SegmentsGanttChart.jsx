import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSegmentsByPlanId } from '@/lib/api/tripQueries'
import GanttChart from '@/components/GanttChart'
import { calculateTotalDays } from '@/lib/utils.js'
import dayjs from 'dayjs'

const SegmentsGanttChart = ({
    planId,
}) => {
    
    const { data: segments } = useQuery({
        queryKey: ['segments', planId],
        queryFn: () => planId ? getSegmentsByPlanId(planId) : Promise.resolve([]),
        enabled: !!planId,
    })
    
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
        
    }, [planId, segments])
    
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
