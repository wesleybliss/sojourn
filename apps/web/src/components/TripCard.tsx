/* eslint-disable @stylistic/max-len */
import { Trip } from '@repo/shared/types/database'
import { cn } from '@repo/shared/utils'
import dayjs from 'dayjs'
import { ArrowUpRight, BookX, CalendarRange, Route } from 'lucide-react'
import { MouseEventHandler, useMemo } from 'react'

import { Button } from '@/components/ui/button'

type TripCardTrip = Trip & {
    segmentCount?: number
}

interface TripCardProps {
    trip: TripCardTrip
    onClick: () => void
    onDeleteTripClick: MouseEventHandler<HTMLButtonElement>
}

const TripCard = ({
    trip,
    onClick,
    onDeleteTripClick,
}: TripCardProps) => {
    
    const segmentCount = trip.segmentCount
        || trip.plans?.reduce((total, plan) => total + (plan.segments?.length || 0), 0)
        || 0
    
    const dateRangeLabel = useMemo(() => {
        
        const segments = trip.plans?.flatMap(plan => plan.segments || []) || []
        
        if (!segments.length)
            return 'Dates pending'
        
        const sortedSegments = [...segments].sort((a, b) => (
            dayjs(a.startDate as Date).valueOf() - dayjs(b.startDate as Date).valueOf()
        ))
        
        const startDate = dayjs(sortedSegments[0].startDate as Date)
        const endDate = dayjs(sortedSegments[sortedSegments.length - 1].endDate as Date)
        
        return `${startDate.format('MMM D')} - ${endDate.format('MMM D, YYYY')}`
        
    }, [trip.plans])
    
    return (
        
        <article
            className="group relative overflow-hidden rounded-[28px] border border-border/70
                bg-surface-container-lowest shadow-sm transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl"
            data-id={trip.id}
            onClick={onClick}>
            <div className="relative aspect-[16/9] overflow-hidden bg-surface-container">
                {trip.coverImageUrl ? (
                    <img
                        alt={`${trip.name} cover`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={trip.coverImageUrl} />
                ) : (
                    <div
                        className="h-full w-full
                            bg-[linear-gradient(135deg,_#dbe5f0_0%,_#f8fafc_45%,_#c8d4e2_100%)]
                            dark:bg-[linear-gradient(135deg,_#203149_0%,_#152235_55%,_#2a3d57_100%)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#091426]/55 via-transparent to-transparent" />
            </div>
            
            <div className="space-y-4 p-5">
                <div className="space-y-2">
                    <div className="eyebrow">Journey Overview</div>
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="font-headline truncate text-xl font-semibold">{trip.name}</h3>
                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                {trip.description
                                    || 'A deliberately paced itinerary with room for edits and route research.'}
                            </p>
                        </div>
                        <span className="rounded-full border border-border/70 bg-surface-container-low px-2.5 py-1 text-muted-foreground">
                            <ArrowUpRight className="size-4" />
                        </span>
                    </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span
                        className="inline-flex items-center gap-2 rounded-full
                            bg-surface-container-low px-3 py-1.5">
                        <CalendarRange className="size-4" />
                        {dateRangeLabel}
                    </span>
                    <span className={cn(
                        'inline-flex items-center gap-2 rounded-full px-3 py-1.5',
                        'bg-primary text-primary-foreground',
                    )}>
                        <Route className="size-4" />
                        {segmentCount} segment{segmentCount === 1 ? '' : 's'}
                    </span>
                </div>
                
                <div className="flex items-center justify-end border-t border-border/60 pt-4">
                    <Button
                        aria-label={`Delete ${trip.name}`}
                        onClick={onDeleteTripClick}
                        size="icon-sm"
                        variant="outline">
                        <BookX />
                    </Button>
                </div>
            </div>
        </article>
        
    )
    
}

export default TripCard
