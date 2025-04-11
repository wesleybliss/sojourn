import { useMemo } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import segmentsRepo from '@/db/repositories/segments'
import GanttChart from '@/components/GanttChart'
import dayjs from 'dayjs'

const SegmentsGanttChart = ({
    tripId,
}) => {
    
    const segments = useLiveQuery(() => tripId ? (
        segmentsRepo.table
            .where('tripId')
            .equals(tripId)
            // .reverse()
            .sortBy('startDate')
            // .toArray()
    ) : null, [tripId])
    
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
        }))
        
    }, [tripId, segments])
    
    if (!items?.length) return null
    
    return (
        
        <GanttChart
            items={items}
            setItems={() => {}} />
        
    )
    
}

export default SegmentsGanttChart
