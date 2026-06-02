import { Place, Trip } from '@repo/shared/types/database'
import { cn } from '@repo/shared/utils'
import dayjs from 'dayjs'
import { Bookmark, BookmarkCheck, CalendarRange, MapPinned, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import InputDialog from '@/components/InputDialog'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreatePlace, usePlacesQuery, useUpdatePlace } from '@/lib/queries/places'
import { useTripsQuery } from '@/lib/queries/trips'

type PlaceRecord = Place & {
    focus?: string | null
    quickTip?: string | null
    personalNotes?: string | null
    region?: string | null
    travelWindow?: string | null
    isBookmarked?: boolean
}

const defaultRegions = ['All', 'Europe', 'Asia', 'Americas']

export default function PlacesPage() {
    
    const { data: placesData, isLoading } = usePlacesQuery()
    const { data: tripsData } = useTripsQuery({
        withDetails: true,
    })
    
    const updatePlace = useUpdatePlace()
    const createPlace = useCreatePlace()
    
    const [search, setSearch] = useState('')
    const [activeRegion, setActiveRegion] = useState('All')
    const [addPlaceDialogOpen, setAddPlaceDialogOpen] = useState(false)
    
    const trips = useMemo(() => (tripsData || []) as Trip[], [tripsData])
    const places = useMemo(() => (placesData || []) as PlaceRecord[], [placesData])
    
    const recentSegments = useMemo(() => trips
        .flatMap(trip => (trip.plans || []).flatMap(plan => (plan.segments || []).map(segment => ({
            id: `${trip.id}-${segment.id}`,
            tripName: trip.name,
            segmentName: segment.name,
            updatedAt: segment.updatedAt as Date,
            dateRange: `${dayjs(segment.startDate as Date)
                .format('MMM D')} - ${dayjs(segment.endDate as Date).format('MMM D')}`,
        }))))
        .sort((a, b) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf()), [trips])
    
    const regionFilters = useMemo(() => {
        const dynamicRegions = places
            .map(place => place.region)
            .filter((region): region is string => Boolean(region?.length))
            .filter((region, index, arr) => arr.indexOf(region) === index)
        
        return Array.from(new Set([...defaultRegions, ...dynamicRegions]))
    }, [places])
    
    const getSegmentCountForPlace = (place: PlaceRecord) => recentSegments.filter(segment => {
        const query = place.name.toLowerCase()
        
        return segment.segmentName.toLowerCase().includes(query)
            || segment.tripName.toLowerCase().includes(query)
    }).length
    
    const filteredPlaces = useMemo(() => places.filter(place => {
        const query = search.trim().toLowerCase()
        
        const matchesSearch = !query || [
            place.name,
            place.focus,
            place.quickTip,
            place.personalNotes,
            place.region,
        ].some(value => value?.toLowerCase().includes(query))
        
        const matchesRegion = activeRegion === 'All' || place.region === activeRegion
        
        return matchesSearch && matchesRegion
    }), [activeRegion, places, search])
    
    const handleCreatePlace = async (name: string) => {
        
        try {
            await createPlace.mutateAsync({
                name,
                region: activeRegion === 'All' ? 'Unassigned' : activeRegion,
                focus: 'Add a destination focus',
                quickTip: 'Capture the one thing future-you should remember.',
                personalNotes: 'Use this card as a planning scratchpad.',
                travelWindow: dayjs().add(3, 'month').format('MMM YYYY'),
                isBookmarked: true,
            })
            toast.success('Place created')
        } catch (error) {
            console.error('PlacesPage.handleCreatePlace', error)
            toast.error('Failed to create place')
        }
    }
    
    const toggleBookmark = async (place: PlaceRecord) => {
        
        try {
            await updatePlace.mutateAsync({
                id: place.id,
                isBookmarked: !place.isBookmarked,
            })
        } catch (error) {
            console.error('PlacesPage.toggleBookmark', error)
            toast.error('Failed to update bookmark')
        }
    }
    
    const sectionClasses = [
        'bg-[linear-gradient(135deg,_rgba(233,238,243,1)_0%,_rgba(247,249,251,1)_55%,_rgba(216,226,238,0.85)_100%)]',
        'dark:bg-[linear-gradient(135deg,_rgba(32,49,73,0.9)_0%,_rgba(17,28,45,1)_55%,_rgba(42,61,87,0.7)_100%)]',
    ]
    
    return (
        
        <ProtectedRoute>
            <div className="flex flex-col gap-8 py-4">
                <section className={`section-card overflow-hidden p-6 lg:p-8 ${sectionClasses.join(' ')}`}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <div className="eyebrow mb-3">Saved Places</div>
                            <h1 className="text-3xl font-semibold tracking-tighter lg:text-4xl">
                                My Places
                            </h1>
                            <p className="mt-3 text-sm text-muted-foreground lg:text-base">
                                Keep destination research, quick operational tips, and travel windows in a
                                single dashboard before they become segments.
                            </p>
                        </div>
                        <Button className="rounded-full" onClick={() => setAddPlaceDialogOpen(true)}>
                            <Plus />
                            Add Place
                        </Button>
                    </div>
                </section>
                
                <section className="section-card p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative lg:w-md">
                            <Search className="pointer-events-none absolute left-3 top-1/2
                                size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                className="rounded-full pl-9"
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search by name, notes, quick tip, or region"
                                value={search} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {regionFilters.map(region => (
                                <button
                                    className={cn(
                                        'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                                        activeRegion === region
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'border-border/70 bg-surface-container-low hover:bg-accent',
                                    )}
                                    key={region}
                                    onClick={() => setActiveRegion(region)}
                                    type="button">
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section className="grid gap-5 md:grid-cols-3 2xl:grid-cols-4">
                    {filteredPlaces.map(place => {
                        const segmentCount = getSegmentCountForPlace(place)
                        
                        return (
                            
                            <article
                                className="overflow-hidden rounded-[28px] border border-border/70
                                    bg-surface-container-lowest shadow-sm"
                                key={place.id}>
                                <div className="relative aspect-video overflow-hidden bg-surface-container">
                                    {place.coverImageUrl ? (
                                        <img
                                            alt={place.name}
                                            className="h-full w-full object-cover"
                                            src={place.coverImageUrl} />
                                    ) : (
                                        <div className="h-full w-full
                                            bg-[linear-gradient(135deg,#dbe5f0_0%,#f8fafc_45%,#c8d4e2_100%)]
                                            dark:bg-[linear-gradient(135deg,#203149_0%,#152235_55%,#2a3d57_100%)]" />
                                    )}
                                    <div className="absolute left-4 top-4 rounded-full
                                        bg-surface-container-lowest/92 px-3 py-1 text-[11px]
                                        font-semibold uppercase tracking-[0.18em] text-foreground">
                                        {place.region || 'Unassigned'}
                                    </div>
                                </div>
                                
                                <div className="space-y-4 p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="eyebrow mb-2">Destination Card</div>
                                            <h2 className="font-headline text-2xl font-semibold">{place.name}</h2>
                                        </div>
                                        <button
                                            className="rounded-full border border-border/70 p-2
                                                transition-colors hover:bg-accent"
                                            onClick={() => toggleBookmark(place)}
                                            type="button">
                                            {place.isBookmarked ? (
                                                <BookmarkCheck className="size-5 text-primary" />
                                            ) : (
                                                <Bookmark className="size-5 text-muted-foreground" />
                                            )}
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                                Focus
                                            </div>
                                            <p className="mt-1 text-foreground/90">
                                                {place.focus || 'Add a destination focus to clarify '
                                                    + 'why this place is on the shortlist.'}
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                                Quick tip
                                            </div>
                                            <p className="mt-1 text-foreground/90">
                                                {place.quickTip || 'Capture internet, transit, '
                                                    + 'or neighborhood notes here.'}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                                Personal notes
                                            </div>
                                            <p className="mt-1 text-foreground/90">
                                                {place.personalNotes || 'Add the reasons this place '
                                                    + 'is worth revisiting later.'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center justify-between gap-3
                                        border-t border-border/60 pt-4 text-sm">
                                        <span className="inline-flex items-center gap-2 rounded-full
                                            bg-surface-container-low px-3 py-1.5 text-muted-foreground">
                                            <MapPinned className="size-4" />
                                            {segmentCount} linked segment{segmentCount === 1 ? '' : 's'}
                                        </span>
                                        <span className="inline-flex items-center gap-2 rounded-full
                                            border border-border/70 px-3 py-1.5 text-muted-foreground">
                                            <CalendarRange className="size-4" />
                                            {place.travelWindow || 'Window TBD'}
                                        </span>
                                    </div>
                                </div>
                            </article>
                            
                        )
                    })}
                    
                    {!filteredPlaces.length && !isLoading && (
                        <div className="section-card col-span-full border-dashed
                            px-6 py-16 text-center text-muted-foreground">
                            No places match the current filters.
                        </div>
                    )}
                </section>
                
                <section className="section-card overflow-hidden">
                    <div className="border-b border-border/70 px-6 py-5">
                        <div className="eyebrow mb-2">Reference Feed</div>
                        <h2 className="text-2xl font-semibold tracking-[-0.04em]">Recently Viewed Segments</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            A compact log of the latest segment activity across your trip workspace.
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border/70 text-sm">
                            <thead className="bg-surface-container-low text-left text-xs uppercase
                                tracking-[0.18em] text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Trip</th>
                                    <th className="px-6 py-4 font-medium">Segment</th>
                                    <th className="px-6 py-4 font-medium">Travel window</th>
                                    <th className="px-6 py-4 font-medium">Updated</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {recentSegments.slice(0, 8).map(segment => (
                                    <tr key={segment.id}>
                                        <td className="px-6 py-4 font-medium">{segment.tripName}</td>
                                        <td className="px-6 py-4">{segment.segmentName}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{segment.dateRange}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {dayjs(segment.updatedAt).format('MMM D, YYYY h:mm A')}
                                        </td>
                                    </tr>
                                ))}
                                {!recentSegments.length && (
                                    <tr>
                                        <td className="px-6 py-8 text-muted-foreground" colSpan={4}>
                                            No trip segments are available yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            
            <InputDialog
                description="Create a saved place card with a generated cover image and planning notes scaffold."
                initialValue=""
                inputFieldLabel="Place name"
                onSubmit={handleCreatePlace}
                open={addPlaceDialogOpen}
                setOpen={setAddPlaceDialogOpen}
                title="Add Place" />
        </ProtectedRoute>
    )
}
