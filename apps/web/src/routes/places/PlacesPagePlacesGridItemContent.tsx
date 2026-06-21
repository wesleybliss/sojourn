import { useWire } from '@forminator/react-wire'
import { ListViewMode, ListViewModes, Place } from '@repo/shared/types'
import { Bookmark, BookmarkCheck, Building2, CalendarRange, MapPinned } from 'lucide-react'

import { Button } from '@/components/ui/button'
import * as store from '@/store'
import { cn } from '@/utils'

export interface PlacesPagePlacesGridItemContentProps {
    place: Place
    segmentCount: number
    listViewMode: ListViewMode
    toggleBookmark: (place: Place) => void
}

const PlacesPagePlacesGridItemContent = ({
    place,
    segmentCount,
    listViewMode,
    toggleBookmark,
}: PlacesPagePlacesGridItemContentProps) => {
    
    const cityDetailsDialogCityId = useWire(store.cityDetailsDialogCityId)
    
    return (
        
        <div className={cn('w-full', {
            'space-y-1 px-5': listViewMode === ListViewModes.list,
            'space-y-4 p-5': listViewMode === ListViewModes.grid,
        })}>
            
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="eyebrow mb-2">
                        Destination Card
                    </div>
                    <h2 className={cn('font-headline font-semibold', {
                        'text-xl': listViewMode === ListViewModes.list,
                        'text-2xl': listViewMode === ListViewModes.grid,
                    })}>
                        {place.name}
                    </h2>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        className="rounded-full"
                        variant="outline"
                        size="icon"
                        onClick={() => cityDetailsDialogCityId.setValue(place.geonamesCityId)}>
                        <Building2 />
                    </Button>
                    <Button
                        className="rounded-full"
                        variant="outline"
                        size="icon"
                        onClick={() => toggleBookmark(place)}>
                        {place.isBookmarked
                            ? <BookmarkCheck className="size-5 text-primary" />
                            : <Bookmark className="size-5 text-muted-foreground" />}
                    </Button>
                </div>
            </div>
            
            <div className={cn('space-y-3 text-sm', {
                'flex flex-col lg:flex-row justify-between items-start gap-4': listViewMode === ListViewModes.list,
            })}>
                <div className="rounded-2xl bg-surface-container-low/50 py-3 px-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Focus
                    </div>
                    <p className="mt-1 text-foreground/90">
                        {place.focus || 'Add a destination focus to clarify '
                            + 'why this place is on the shortlist.'}
                    </p>
                </div>
                <div className="rounded-2xl bg-surface-container-low/50 py-3 px-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Quick tip
                    </div>
                    <p className="mt-1 text-foreground/90">
                        {place.quickTip || 'Capture internet, transit, '
                            + 'or neighborhood notes here.'}
                    </p>
                </div>
                <div className="rounded-2xl bg-surface-container-low/50 py-3 px-4">
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
        
    )
    
}

export default PlacesPagePlacesGridItemContent
