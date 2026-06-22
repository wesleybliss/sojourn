import { ListViewMode, ListViewModes, Place } from '@repo/shared/types'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils'

export interface PlacesPagePlacesGridItemCoverImageProps {
    place: Place
    listViewMode: ListViewMode
}

const PlacesPagePlacesGridItemCoverImage = ({
    place,
    listViewMode,
}: PlacesPagePlacesGridItemCoverImageProps) => {
    
    return (
        
        <div className={cn('relative ', {
            'size-12 object-cover rounded-md shrink-0': listViewMode === ListViewModes.listCompact,
            'size-48 object-cover rounded-md shrink-0': listViewMode === ListViewModes.list,
            'aspect-video overflow-hidden bg-surface-container': listViewMode === ListViewModes.grid,
        })}>
            
            {place.coverImageUrl ? (
                <img
                    className={cn('h-full w-full object-cover', {
                        'rounded-md': listViewMode === ListViewModes.list,
                    })}
                    alt={place.name}
                    src={place.coverImageUrl} />
            ) : (
                <div className="h-full w-full
                    bg-[linear-gradient(135deg,#dbe5f0_0%,#f8fafc_45%,#c8d4e2_100%)]
                    dark:bg-[linear-gradient(135deg,#203149_0%,#152235_55%,#2a3d57_100%)]" />
            )}
            
            {listViewMode === ListViewModes.listCompact ? (
                <Badge className="absolute top-1 right-1 h-2 w-2 rounded-full p-0 bg-rose-300" />
            ) : (
                <div className="absolute left-4 top-4 rounded-full
                    bg-surface-container-lowest/92 text-[11px] px-3 py-1
                    'font-semibold uppercase tracking-[0.18em] text-foreground">
                    {'@todo Unassigned'}
                </div>
            )}
        
        </div>
        
    )
    
}

export default PlacesPagePlacesGridItemCoverImage
