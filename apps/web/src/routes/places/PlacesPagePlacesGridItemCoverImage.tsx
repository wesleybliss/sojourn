import { Place } from '@repo/shared/types'

export interface PlacesPagePlacesGridItemCoverImageProps {
    place: Place
}

const PlacesPagePlacesGridItemCoverImage = ({
    place,
}: PlacesPagePlacesGridItemCoverImageProps) => {
    
    return (
        
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
        
    )
    
}

export default PlacesPagePlacesGridItemCoverImage
