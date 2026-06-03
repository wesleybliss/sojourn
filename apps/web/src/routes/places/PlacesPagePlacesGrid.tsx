import { Place } from '@repo/shared/types'
import { Bookmark, BookmarkCheck, CalendarRange, MapPinned } from 'lucide-react'

export interface PlacesPagePlacesGridProps {
    isLoading: boolean
    filteredPlaces: Place[]
    getSegmentCountForPlace: (place: Place) => number
    toggleBookmark: (place: Place) => void
}

const PlacesPagePlacesGrid = ({
    isLoading,
    filteredPlaces,
    getSegmentCountForPlace,
    toggleBookmark,
}: PlacesPagePlacesGridProps) => {
    
    return (
        
        <section className="grid gap-5 md:grid-cols-3 2xl:grid-cols-4">
            
            {filteredPlaces.map(place => {
                
                const segmentCount = getSegmentCountForPlace(place)
                
                return (
                    
                    <article
                        key={place.id}
                        className="overflow-hidden rounded-[28px] border border-border/70
                            bg-surface-container-lowest shadow-sm">
                        
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
                        
                        <div className="space-y-4 p-5 border border-red-500">
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
        
    )
    
}

export default PlacesPagePlacesGrid
