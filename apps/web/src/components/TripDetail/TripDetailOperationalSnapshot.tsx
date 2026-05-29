import { Segment } from '@repo/shared/types'
import dayjs from 'dayjs'
import { CloudSun } from 'lucide-react'
import { useMemo } from 'react'

import useCurrentWeather from '@/hooks/useCurrentWeather'

interface TripDetailOperationalSnapshotProps {
    segments: Segment[]
}

const TripDetailOperationalSnapshot = ({
    segments,
}: TripDetailOperationalSnapshotProps) => {
    
    const currentSegment = useMemo(() => {
        
        const activeSegment = segments.find(segment => (
            dayjs().isAfter(dayjs(segment.startDate as Date).subtract(1, 'day'))
            && dayjs().isBefore(dayjs(segment.endDate as Date).add(1, 'day'))
        ))
        
        if (activeSegment)
            return activeSegment
        
        return segments.find(segment => dayjs(segment.startDate as Date).isAfter(dayjs())) || segments[0]
        
    }, [segments])
    
    const nextSegment = useMemo(() => {
        if (!currentSegment)
            return null
        
        return segments.find(segment => (
            dayjs(segment.startDate as Date).isAfter(dayjs(currentSegment.endDate as Date))
        )) || null
    }, [currentSegment, segments])
    
    const weather = useCurrentWeather(currentSegment)
    
    return (
        
        <article data-testid="TripDetailOperationalSnapshot" className="section-card p-5">
            <div className="eyebrow mb-4">Operational Snapshot</div>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold tracking-[-0.04em]">
                        Weather & Next Stop
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Current stop context plus countdown to the next movement.
                    </p>
                </div>
                <CloudSun className="size-6 text-muted-foreground" />
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl bg-surface-container-low px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Current stop
                    </div>
                    <div className="mt-2 text-lg font-semibold">
                        {currentSegment?.name || 'No active segment'}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                        {weather
                            ? `${weather.label}, ${weather.temperature}°C`
                            : 'Live weather unavailable for this stop.'}
                    </div>
                </div>
                <div className="rounded-2xl bg-surface-container-low px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Next movement
                    </div>
                    <div className="mt-2 text-lg font-semibold">
                        {nextSegment?.name || 'No upcoming stop'}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                        {nextSegment
                            ? `${Math.max(dayjs(nextSegment.startDate as Date)
                                .diff(dayjs(), 'day'), 0)} days until departure`
                            : currentSegment
                                ? `Current window ends ${dayjs(currentSegment.endDate)
                                    .format('MMM D')}`
                                : 'Add a segment to generate a countdown.'}
                    </div>
                </div>
            </div>
        </article>
        
    )
    
}

export default TripDetailOperationalSnapshot
