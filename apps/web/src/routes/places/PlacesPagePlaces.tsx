import { ID, ListViewMode, ListViewModes, Place } from '@repo/shared/types'
import { memo } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import PlacesPagePlacesGridItemContent from '@/routes/places/PlacesPagePlacesGridItemContent'
import PlacesPagePlacesGridItemCoverImage from '@/routes/places/PlacesPagePlacesGridItemCoverImage'
import { cn } from '@/utils'

export interface PlacesPagePlacesProps {
    isLoading: boolean
    filteredPlaces: Place[]
    placesListViewMode: ListViewMode
    hasChecked: (idOrIds: (ID | ID[])) => boolean
    toggleChecked: (idOrIds: (ID | ID[])) => void
    getSegmentCountForPlace: (place: Place) => number
    toggleBookmark: (place: Place) => void
}

const PlacesPagePlaces = memo(({
    isLoading,
    filteredPlaces,
    placesListViewMode,
    hasChecked,
    toggleChecked,
    getSegmentCountForPlace,
    toggleBookmark,
}: PlacesPagePlacesProps) => {
    
    if (isLoading) return <div className="section-card col-span-full">Loading...</div>
    
    if (!filteredPlaces.length) return (
        <div className={cn('border-dashed px-6 py-16 section-card text-center text-muted-foreground', {
            'w-full': placesListViewMode === ListViewModes.list,
            'col-span-full': placesListViewMode === ListViewModes.grid,
        })}>
            No places match the current filters.
        </div>
    )
    
    if (placesListViewMode === ListViewModes.listCompact) return (
        <section className="section-card space-y-3">
            {filteredPlaces.map(place => {
                
                const segmentCount = getSegmentCountForPlace(place)
                
                return (
                    
                    <article key={place.id} className="flex items-start gap-4 p-4 border rounded-md">
                        
                        <Checkbox
                            checked={hasChecked(place.id)}
                            onCheckedChange={() => toggleChecked(place.id)} />
                        
                        <div className="flex-1 flex items-start gap-2">
                            
                            <PlacesPagePlacesGridItemCoverImage
                                place={place}
                                listViewMode={placesListViewMode} />
                            
                            <PlacesPagePlacesGridItemContent
                                place={place}
                                segmentCount={segmentCount}
                                listViewMode={placesListViewMode}
                                toggleBookmark={toggleBookmark}/>
                        
                        </div>
                    
                    </article>
                )
                
            })}
        </section>
    )
    
    if (placesListViewMode === ListViewModes.list) return (
        <section className="section-card space-y-3">
            {filteredPlaces.map(place => {
                
                const segmentCount = getSegmentCountForPlace(place)
                
                return (
                    
                    <article key={place.id} className="flex items-start gap-4 p-4 border rounded-md">
                        
                        <Checkbox
                            checked={hasChecked(place.id)}
                            onCheckedChange={() => toggleChecked(place.id)} />
                        
                        <div className="flex-1 flex items-start gap-2">
                            
                            <PlacesPagePlacesGridItemCoverImage
                                place={place}
                                listViewMode={placesListViewMode} />
                            
                            <PlacesPagePlacesGridItemContent
                                place={place}
                                segmentCount={segmentCount}
                                listViewMode={placesListViewMode}
                                toggleBookmark={toggleBookmark}/>
                        
                        </div>
                    
                    </article>
                )
                
            })}
        </section>
    )
    
    return (
        
        <section className="grid gap-5 md:grid-cols-3 2xl:grid-cols-4">
            
            {filteredPlaces.map(place => {
                
                const segmentCount = getSegmentCountForPlace(place)
                
                return (
                    
                    <article
                        key={place.id}
                        className="overflow-hidden rounded-[28px] border border-border/70
                            bg-surface-container-lowest shadow-sm space-y-2">
                        
                        <PlacesPagePlacesGridItemCoverImage
                            place={place}
                            listViewMode={placesListViewMode} />
                        
                        <PlacesPagePlacesGridItemContent
                            place={place}
                            segmentCount={segmentCount}
                            listViewMode={placesListViewMode}
                            toggleBookmark={toggleBookmark} />
                    
                    </article>
                    
                )
            })}
        
        </section>
        
    )
    
})

export default PlacesPagePlaces
