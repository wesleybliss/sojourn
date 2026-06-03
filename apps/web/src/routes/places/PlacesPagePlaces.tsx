import { ListViewMode, ListViewModes, Place } from '@repo/shared/types'

import { Checkbox } from '@/components/ui/checkbox'
import useCheckItems from '@/hooks/useCheckItems'
import PlacesPagePlacesGridItemContent from '@/routes/places/PlacesPagePlacesGridItemContent'
import PlacesPagePlacesGridItemCoverImage from '@/routes/places/PlacesPagePlacesGridItemCoverImage'
import { cn } from '@/utils'

export interface PlacesPagePlacesProps {
    isLoading: boolean
    filteredPlaces: Place[]
    placesListViewMode: ListViewMode
    getSegmentCountForPlace: (place: Place) => number
    toggleBookmark: (place: Place) => void
}

const PlacesPagePlaces = ({
    isLoading,
    filteredPlaces,
    placesListViewMode,
    getSegmentCountForPlace,
    toggleBookmark,
}: PlacesPagePlacesProps) => {
    
    const { hasChecked, toggleChecked } = useCheckItems(filteredPlaces)
    
    if (isLoading) return <div className="section-card col-span-full">Loading...</div>
    
    if (!filteredPlaces.length) return (
        <div className={cn('border-dashed px-6 py-16 section-card text-center text-muted-foreground', {
            'w-full': placesListViewMode === ListViewModes.list,
            'col-span-full': placesListViewMode === ListViewModes.grid,
        })}>
            No places match the current filters.
        </div>
    )
    
    if (placesListViewMode === ListViewModes.list) return (
        
        <div className="space-y-4">
            
            {filteredPlaces.map(place => {
                
                const segmentCount = getSegmentCountForPlace(place)
                
                return (
                    <div key={place.id} className="flex items-start space-x-4 p-4 border rounded-md">
                        <Checkbox
                            checked={hasChecked(place.id)}
                            onCheckedChange={() => toggleChecked(place.id)} />
                        {/*<input
                            type="checkbox"
                            checked={checked.includes(place.id)}
                            onChange={() => toggleChecked(place.id)}
                            className="h-4 w-4 text-primary-600
                                focus:ring-primary-500 border-gray-300 rounded" />*/}
                        <div className="flex-1 space-y-2">
                            <PlacesPagePlacesGridItemCoverImage
                                place={place}
                                listViewMode={placesListViewMode} />
                            <PlacesPagePlacesGridItemContent
                                place={place}
                                segmentCount={segmentCount}
                                toggleBookmark={toggleBookmark}/>
                        </div>
                    </div>
                )
                
            })}
        
        </div>
        
    )
    
    return (
        
        <section className="grid gap-5 md:grid-cols-3 2xl:grid-cols-4">
            
            {filteredPlaces.map(place => {
                
                const segmentCount = getSegmentCountForPlace(place)
                
                return (
                    
                    <article
                        key={place.id}
                        className="overflow-hidden rounded-[28px] border border-border/70
                            bg-surface-container-lowest shadow-sm">
                        
                        <PlacesPagePlacesGridItemCoverImage
                            place={place}
                            listViewMode={placesListViewMode} />
                        
                        <PlacesPagePlacesGridItemContent
                            place={place}
                            segmentCount={segmentCount}
                            toggleBookmark={toggleBookmark} />
                    
                    </article>
                    
                )
            })}
        
        </section>
        
    )
    
}

export default PlacesPagePlaces
