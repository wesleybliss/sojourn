import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { sectionClasses } from '@/routes/places/PlacesPageViewModel'

export interface PlacesPageHeaderProps {
    onAddPlaceClick: () => void
}

const PlacesPageHeader = ({
    onAddPlaceClick,
}: PlacesPageHeaderProps) => {
    
    return (
        
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
                
                <Button className="rounded-full" onClick={onAddPlaceClick}>
                    <Plus />
                    Add Place
                </Button>
            
            </div>
        
        </section>
        
    )
    
}

export default PlacesPageHeader
