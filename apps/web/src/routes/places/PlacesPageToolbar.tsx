import { ListViewMode, ListViewModes } from '@repo/shared/types'
import { cn } from '@repo/shared/utils'
import { Grid2x2, List, Plus, Search } from 'lucide-react'
import { Dispatch, memo, SetStateAction } from 'react'

import GraphicalCheckbox from '@/components/GraphicalCheckbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import PlacesPageToolbarMenu from '@/routes/places/PlacesPageToolbarMenu'

export interface PlacesPageSearchProps {
    query: string
    setQuery: Dispatch<SetStateAction<string>>
    placesListViewMode: ListViewMode
    setPlacesListViewMode: Dispatch<SetStateAction<ListViewMode>>
    regionFilters: string[]
    activeRegion: string
    setActiveRegion: Dispatch<SetStateAction<string>>
    allChecked: boolean
    anyChecked: boolean
    toggleAllChecked: (forceAll?: boolean) => void
    onAddPlaceClick: () => void
}

const PlacesPageToolbar = memo(({
    query,
    setQuery,
    placesListViewMode,
    setPlacesListViewMode,
    regionFilters,
    activeRegion,
    setActiveRegion,
    allChecked,
    anyChecked,
    toggleAllChecked,
    onAddPlaceClick,
}: PlacesPageSearchProps) => {
    
    return (
        
        <section className="section-card p-5">
            
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                
                <div className="relative lg:w-md">
                    <Search className="pointer-events-none absolute left-3 top-1/2
                        size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        className="rounded-full pl-9"
                        placeholder="Search by name, notes, quick tip, or region"
                        value={query}
                        onKeyUp={e => {
                            if (e.key === 'Escape') {
                                setQuery('')
                                e.currentTarget.blur()
                            }
                        }}
                        onChange={e => setQuery(e.target.value)} />
                </div>
                
                <div className="flex items-center justify-center gap-2">
                    <GraphicalCheckbox
                        checked={allChecked}
                        indeterminate={anyChecked}
                        tooltip="Select all places"
                        tooltipProps={{ side: 'bottom' }}
                        onChange={() => toggleAllChecked(!allChecked)} />
                    <ToggleGroup
                        type="single"
                        variant="outline"
                        value={placesListViewMode}
                        onValueChange={setPlacesListViewMode}>
                        <Tooltip>
                            <ToggleGroupItem asChild value={ListViewModes.list} aria-label="Toggle list">
                                <TooltipTrigger>
                                    <List />
                                </TooltipTrigger>
                            </ToggleGroupItem>
                            <TooltipContent side="bottom">
                                Toggle List View
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <ToggleGroupItem asChild value={ListViewModes.grid} aria-label="Toggle grid">
                                <TooltipTrigger>
                                    <Grid2x2 />
                                </TooltipTrigger>
                            </ToggleGroupItem>
                            <TooltipContent side="bottom">
                                Toggle Grid View
                            </TooltipContent>
                        </Tooltip>
                    </ToggleGroup>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    <Button className="rounded-full" onClick={onAddPlaceClick}>
                        <Plus/>
                        Add Place
                    </Button>
                    <div className="flex items-center content-center mx-4">
                        <div className="h-6 w-px bg-primary/20" />
                    </div>
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
                    {anyChecked && (
                        <PlacesPageToolbarMenu />
                    )}
                </div>
            
            </div>
        
        </section>
        
    )
    
})

export default PlacesPageToolbar
