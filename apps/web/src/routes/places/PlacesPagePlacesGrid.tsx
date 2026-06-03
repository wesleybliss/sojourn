import { Place } from '@repo/shared/types'

import PlacesPagePlacesGridItemContent from '@/routes/places/PlacesPagePlacesGridItemContent'
import PlacesPagePlacesGridItemCoverImage from '@/routes/places/PlacesPagePlacesGridItemCoverImage'

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
                        
                        <PlacesPagePlacesGridItemCoverImage place={place} />
                        
                        <PlacesPagePlacesGridItemContent
                            place={place}
                            segmentCount={segmentCount}
                            toggleBookmark={toggleBookmark} />
                    
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
