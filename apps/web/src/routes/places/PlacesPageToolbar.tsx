import { ListViewMode, ListViewModes } from '@repo/shared/types'
import { cn } from '@repo/shared/utils'
import { Search } from 'lucide-react'
import { Grid2x2, List } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { Input } from '@/components/ui/input'
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/components/ui/toggle-group'

export interface PlacesPageSearchProps {
    query: string
    setQuery: Dispatch<SetStateAction<string>>
    placesListViewMode: ListViewMode
    setPlacesListViewMode: Dispatch<SetStateAction<ListViewMode>>
    regionFilters: string[]
    activeRegion: string
    setActiveRegion: Dispatch<SetStateAction<string>>
}

const PlacesPageToolbar = ({
    query,
    setQuery,
    placesListViewMode,
    setPlacesListViewMode,
    regionFilters,
    activeRegion,
    setActiveRegion,
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
                    <ToggleGroup
                        type="single"
                        variant="outline"
                        value={placesListViewMode}
                        onValueChange={setPlacesListViewMode}>
                        <ToggleGroupItem value={ListViewModes.list} aria-label="Toggle list">
                            <List />
                        </ToggleGroupItem>
                        <ToggleGroupItem value={ListViewModes.grid} aria-label="Toggle grid">
                            <Grid2x2 />
                        </ToggleGroupItem>
                    </ToggleGroup>
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
        
    )
    
}

export default PlacesPageToolbar
