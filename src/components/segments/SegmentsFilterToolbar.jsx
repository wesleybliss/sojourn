import { Input } from '@/components/ui/input'
// import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { List, Grid2x2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const SegmentsFilterToolbar = ({
    className = '',
    vm,
} = {}) => {
    
    return (
        
        <div className={cn('flex flex-col gap-2', className)}>
            
            <div className="flex w-full gap-2 items-center">
                
                <Input
                    type="text"
                    placeholder="Filter by name, date, etc..."
                    value={vm.segmentsFilterQuery}
                    onChange={e => vm.setSegmentsFilterQuery(e.target.value)}
                    onKeyUp={e => e.key === 'Escape' && vm.setSegmentsFilterQuery('')} />
                
                <ToggleGroup
                    type="single"
                    variant="outline"
                    spacing={2}
                    value={vm.segmentsListViewMode}
                    onValueChange={vm.setSegmentsListViewMode}>
                    <ToggleGroupItem
                        className="data-[state=on]:bg-slate-100 data-[state=on]:*:[svg]:stroke-slate-900"
                        value="list"
                        aria-label="Toggle list">
                        <List />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        className="data-[state=on]:bg-slate-100 data-[state=on]:*:[svg]:stroke-slate-900"
                        value="grid"
                        aria-label="Toggle grid">
                        <Grid2x2 />
                    </ToggleGroupItem>
                </ToggleGroup>
            
            </div>
            {/* <div className="flex items-center gap-2">
                <Toggle variant="outline">
                    Testing
                </Toggle>
            </div> */}
        
        </div>
        
    )
    
}

export default SegmentsFilterToolbar
