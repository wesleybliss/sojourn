/* eslint-disable @stylistic/max-len */
import { Segment } from '@repo/shared/types/database'
import { cn } from '@repo/shared/utils'
import dayjs from 'dayjs'
import {
    BedDouble,
    CalendarClock,
    CloudSun,
    Globe2,
    Plane,
    Search,
    TrainFront,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import GanttChart from '@/components/GanttChart'
import SadFolderIcon from '@/components/graphics/SadFolderIcon'
import MapLibreMap from '@/components/MapLibreMap'
import { TTripEditorViewModel } from '@/components/TripEditor/useTripEditorViewModel'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

interface TripDetailProps {
    vm: TTripEditorViewModel
}

type WeatherSummary = {
    temperature: number
    label: string
}

const weatherCodeMap: Record<number, string> = {
    0: 'Clear',
    1: 'Mostly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Fog',
    51: 'Drizzle',
    61: 'Rain',
    63: 'Rain',
    71: 'Snow',
    80: 'Showers',
    95: 'Storm',
}

const getStatusLabel = (segment: Segment, vm: TTripEditorViewModel) => {
    
    if (vm.getSegmentCompleted(segment))
        return 'Completed'
    
    if (vm.getSegmentPlanned(segment))
        return 'Confirmed'
    
    if (segment.flightBooked || segment.stayBooked)
        return 'Partial'
    
    return 'Planning'
}

const useCurrentWeather = (segment?: Segment): WeatherSummary | null => {
    
    const [weather, setWeather] = useState<WeatherSummary | null>(null)
    
    useEffect(() => {
        
        const latitude = segment?.coordsLat
        const longitude = segment?.coordsLng
        
        if (!latitude || !longitude) {
            setWeather(null)
            return
        }
        
        const controller = new AbortController()
        
        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
            { signal: controller.signal },
        )
            .then(async response => response.json())
            .then(data => {
                const current = data?.current
                
                if (!current)
                    return setWeather(null)
                
                setWeather({
                    temperature: Math.round(current.temperature_2m),
                    label: weatherCodeMap[current.weather_code] || 'Conditions',
                })
            })
            .catch(error => {
                if (error?.name !== 'AbortError')
                    console.error('TripDetail.useCurrentWeather', error)
                
                setWeather(null)
            })
        
        return () => controller.abort()
    }, [segment?.coordsLat, segment?.coordsLng])
    
    return weather
}

const TripDetail = ({
    vm,
}: TripDetailProps) => {
    
    const [timelineItems, setTimelineItems] = useState<Segment[]>(vm.segments)
    
    useEffect(() => {
        setTimelineItems(vm.segments)
    }, [vm.segments])
    
    const currentSegment = useMemo(() => {
        
        const activeSegment = vm.segments.find(segment => (
            dayjs().isAfter(dayjs(segment.startDate as Date).subtract(1, 'day'))
            && dayjs().isBefore(dayjs(segment.endDate as Date).add(1, 'day'))
        ))
        
        if (activeSegment)
            return activeSegment
        
        return vm.segments.find(segment => dayjs(segment.startDate as Date).isAfter(dayjs())) || vm.segments[0]
    }, [vm.segments])
    
    const nextSegment = useMemo(() => {
        if (!currentSegment)
            return null
        
        return vm.segments.find(segment => (
            dayjs(segment.startDate as Date).isAfter(dayjs(currentSegment.endDate as Date))
        )) || null
    }, [currentSegment, vm.segments])
    
    const weather = useCurrentWeather(currentSegment)
    
    const schengenPercentage = Math.max(0, Math.min(100, ((vm.shengenData?.totalDays || 0) / 90) * 100))
    const schengenCircumference = 2 * Math.PI * 44
    const schengenOffset = schengenCircumference * (1 - schengenPercentage / 100)
    
    const timelinePoints = vm.filteredSegments
        .filter(segment => segment.coordsLat && segment.coordsLng)
        .map(segment => ({
            coords: [segment.coordsLng!, segment.coordsLat!] as [number, number],
            name: segment.name,
        }))
    
    const hasNoFilteredSegments = vm.segments.length > 0 && vm.filteredSegments.length === 0
    
    return (
        
        <div className="flex flex-1 flex-col gap-6 p-5 lg:p-8">
            {vm.isLoading && (
                <div className="section-card p-5">
                    <p className="mb-3 text-sm text-muted-foreground">Loading itinerary workspace...</p>
                    <Progress className="w-full" value={55} />
                </div>
            )}
            
            {vm.showMap ? (
                <section className="grid flex-1 gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
                    <div className="section-card overflow-hidden">
                        <MapLibreMap
                            className="min-h-[70vh] w-full"
                            latLng={vm.focusedLatLng ? [vm.focusedLatLng.lng, vm.focusedLatLng.lat] : undefined}
                            points={timelinePoints} />
                    </div>
                    <div className="section-card flex flex-col overflow-hidden">
                        <div className="border-b border-border/70 px-5 py-4">
                            <div className="eyebrow mb-2">Map Context</div>
                            <h2 className="text-xl font-semibold tracking-[-0.04em]">Segment Cards</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Review route stops alongside the map and keep your next move visible.
                            </p>
                        </div>
                        <div className="scrollbar-minimal flex-1 space-y-3 overflow-y-auto p-4">
                            {vm.filteredSegments.map((segment, index) => (
                                <button
                                    key={segment.id}
                                    className="w-full rounded-2xl border border-border/70 bg-surface-container-low px-4 py-4 text-left transition-colors hover:bg-surface-container"
                                    onClick={() => {
                                        if (segment.coordsLat && segment.coordsLng) {
                                            vm.setFocusedLatLng({
                                                lat: segment.coordsLat,
                                                lng: segment.coordsLng,
                                            })
                                        }
                                    }}
                                    type="button">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="eyebrow mb-2">Stop {index + 1}</div>
                                            <div className="text-lg font-semibold">{segment.name}</div>
                                            <div className="mt-1 text-sm text-muted-foreground">
                                                {dayjs(segment.startDate as Date).format('MMM D')} - {dayjs(segment.endDate as Date).format('MMM D, YYYY')}
                                            </div>
                                        </div>
                                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                            {getStatusLabel(segment, vm)}
                                        </span>
                                    </div>
                                    {segment.description && (
                                        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                                            {segment.description}
                                        </p>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    <section className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
                            <article className="section-card p-5">
                                <div className="eyebrow mb-4">Compliance</div>
                                <div className="flex items-center gap-5">
                                    <div className="relative flex size-30 items-center justify-center">
                                        <svg className="-rotate-90" height="112" width="112">
                                            <circle
                                                className="stroke-border"
                                                cx="56"
                                                cy="56"
                                                fill="none"
                                                r="44"
                                                strokeWidth="10" />
                                            <circle
                                                className="stroke-[var(--primary)]"
                                                cx="56"
                                                cy="56"
                                                fill="none"
                                                r="44"
                                                strokeDasharray={schengenCircumference}
                                                strokeDashoffset={schengenOffset}
                                                strokeLinecap="round"
                                                strokeWidth="10" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="font-headline text-3xl font-semibold">{Math.round(schengenPercentage)}%</span>
                                            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Used</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-xl font-semibold tracking-[-0.04em]">
                                            Schengen Stay Tracker
                                        </h2>
                                        <div className="text-sm text-muted-foreground">
                                            {vm.shengenData
                                                ? `${vm.shengenData.totalDays} days logged in the current 90-day window.`
                                                : 'No Schengen-tagged segments in this plan yet.'}
                                        </div>
                                        {vm.shengenData && (
                                            <div className="grid gap-2 text-sm">
                                                <div className="rounded-2xl bg-surface-container-low px-3 py-2">
                                                    Window: {vm.shengenData.startDate.format('MMM D')} - {vm.shengenData.endDate.format('MMM D, YYYY')}
                                                </div>
                                                <div className="rounded-2xl bg-surface-container-low px-3 py-2">
                                                    Remaining: {vm.shengenData.remainingDays} days
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                            
                            <article className="section-card p-5">
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
                                        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Current stop</div>
                                        <div className="mt-2 text-lg font-semibold">{currentSegment?.name || 'No active segment'}</div>
                                        <div className="mt-1 text-sm text-muted-foreground">
                                            {weather
                                                ? `${weather.label}, ${weather.temperature}°C`
                                                : 'Live weather unavailable for this stop.'}
                                        </div>
                                    </div>
                                    <div className="rounded-2xl bg-surface-container-low px-4 py-4">
                                        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Next movement</div>
                                        <div className="mt-2 text-lg font-semibold">
                                            {nextSegment?.name || 'No upcoming stop'}
                                        </div>
                                        <div className="mt-1 text-sm text-muted-foreground">
                                            {nextSegment
                                                ? `${Math.max(dayjs(nextSegment.startDate as Date).diff(dayjs(), 'day'), 0)} days until departure`
                                                : currentSegment
                                                    ? `Current window ends ${dayjs(currentSegment.endDate as Date).format('MMM D')}`
                                                    : 'Add a segment to generate a countdown.'}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                        
                        <article className="section-card overflow-hidden">
                            <div className="flex flex-col gap-4 border-b border-border/70 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <div className="eyebrow mb-2">Itinerary Ledger</div>
                                    <h2 className="text-xl font-semibold tracking-[-0.04em]">Dense Itinerary Table</h2>
                                </div>
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <div className="relative">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            className="w-full rounded-full pl-9 sm:w-72"
                                            onChange={e => vm.setSegmentsFilterQuery(e.target.value)}
                                            placeholder="Filter by stop or date"
                                            value={vm.segmentsFilterQuery} />
                                    </div>
                                    <button
                                        className={cn(
                                            'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                                            vm.segmentsListShowCompleted
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-border/70 bg-surface-container-low hover:bg-accent',
                                        )}
                                        onClick={() => vm.setSegmentsListShowCompleted(!vm.segmentsListShowCompleted)}
                                        type="button">
                                        {vm.segmentsListShowCompleted ? 'Hide completed' : 'Show completed'}
                                    </button>
                                </div>
                            </div>
                            <div className="scrollbar-minimal overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-surface-container-low text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Stop</th>
                                            <th className="px-4 py-3 font-medium">Dates</th>
                                            <th className="px-4 py-3 font-medium">Days</th>
                                            <th className="px-4 py-3 font-medium">Cumulative</th>
                                            <th className="px-4 py-3 font-medium">Bookings</th>
                                            <th className="px-4 py-3 font-medium">Region</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/60">
                                        {vm.filteredSegments.map((segment, index) => {
                                            const status = getStatusLabel(segment, vm)
                                            const originalIndex = vm.segments.findIndex(item => item.id === segment.id)
                                            
                                            return (
                                                
                                                <tr className="h-10" key={segment.id}>
                                                    <td className="px-4 py-3">
                                                        <div className="font-medium">{segment.name}</div>
                                                        {segment.description && (
                                                            <div className="line-clamp-1 text-xs text-muted-foreground">
                                                                {segment.description}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-muted-foreground">
                                                        {dayjs(segment.startDate as Date).format('MMM D')} - {dayjs(segment.endDate as Date).format('MMM D')}
                                                    </td>
                                                    <td className="px-4 py-3">{vm.getTotalDaysPerSegment(segment)}</td>
                                                    <td className="px-4 py-3">
                                                        {vm.getCumulativeDaysPerSegment(originalIndex >= 0 ? originalIndex : index)}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2 text-muted-foreground">
                                                            <Plane className={cn('size-4', segment.flightBooked && 'text-emerald-500')} />
                                                            <TrainFront className="size-4 text-slate-400" />
                                                            <BedDouble className={cn('size-4', segment.stayBooked && 'text-sky-500')} />
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={cn(
                                                            'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
                                                            segment.isShengenRegion
                                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                                                                : 'bg-surface-container-low text-muted-foreground',
                                                        )}>
                                                            <Globe2 className="mr-1 size-3.5" />
                                                            {segment.isShengenRegion ? 'Schengen' : 'Open'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={cn(
                                                            'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
                                                            status === 'Confirmed' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/55 dark:text-emerald-300',
                                                            status === 'Partial' && 'bg-amber-100 text-amber-700 dark:bg-amber-950/55 dark:text-amber-300',
                                                            status === 'Completed' && 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
                                                            status === 'Planning' && 'bg-rose-100 text-rose-700 dark:bg-rose-950/55 dark:text-rose-300',
                                                        )}>
                                                            {status}
                                                        </span>
                                                    </td>
                                                </tr>
                                                
                                            )
                                        })}
                                    </tbody>
                                </table>
                                {hasNoFilteredSegments && (
                                    <div className="flex flex-col items-center justify-center gap-5 px-6 py-14 text-center">
                                        <SadFolderIcon className="size-20 text-gray-400" />
                                        <div>
                                            <p className="font-medium">No itinerary rows match the current filters.</p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Adjust the search or include completed segments to restore the full table.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </article>
                    </section>
                    
                    <section className="section-card overflow-hidden">
                        <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                            <div>
                                <div className="eyebrow mb-2">Timeline</div>
                                <h2 className="text-xl font-semibold tracking-[-0.04em]">Gantt Chart Timeline</h2>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-low px-3 py-1.5 text-xs text-muted-foreground">
                                <CalendarClock className="size-4" />
                                Drag bars to test sequencing locally
                            </div>
                        </div>
                        <div className="p-4 lg:p-5">
                            <GanttChart
                                endDateKey="endDate"
                                items={timelineItems}
                                setItems={setTimelineItems}
                                startDateKey="startDate" />
                        </div>
                    </section>
                </>
            )}
        </div>
        
    )
    
}

export default TripDetail
