import { ListViewMode } from '@repo/shared/types/ui'
import { cn } from '@repo/shared/utils'
import { Eye, EyeOff, FolderPen, Grid2x2,List } from 'lucide-react'

import { TTripEditorViewModel } from '@/components/TripEditor/useTripEditorViewModel'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface SegmentsFilterToolbarProps {
    className?: string
    vm: TTripEditorViewModel
}

const SegmentsFilterToolbar = ({
    className = '',
    vm,
}: SegmentsFilterToolbarProps) => {
    
    return (
        
        <div className={cn('flex flex-col gap-2', className)}>
            
            <div className="flex w-full gap-2 items-center">
                
                <Input
                    type="text"
                    placeholder="Filter by name, date, etc..."
                    value={vm.segmentsFilterQuery}
                    onChange={e => vm.setSegmentsFilterQuery(e.target.value)}
                    onKeyUp={e => e.key === 'Escape' && vm.setSegmentsFilterQuery('')} />
                
                <Toggle
                    className="data-[state=on]:bg-slate-100 data-[state=on]:*:[svg]:stroke-slate-900"
                    title="Toggle completed segments"
                    aria-label="Toggle completed segments"
                    size="sm"
                    variant="outline"
                    pressed={vm.segmentsListShowCompleted}
                    onPressedChange={vm.setSegmentsListShowCompleted}>
                    {vm.segmentsListShowCompleted
                        ? <Eye />
                        : <EyeOff />}
                </Toggle>
                
                <Toggle
                    className="data-[state=on]:bg-slate-100 data-[state=on]:*:[svg]:stroke-slate-900"
                    title="Toggle edit mode"
                    aria-label="Toggle edit mode"
                    size="sm"
                    variant="outline"
                    pressed={vm.isTripEditMode}
                    onPressedChange={() => vm.setIsTripEditMode(!vm.isTripEditMode)}>
                    <FolderPen />
                </Toggle>
                
                <ToggleGroup
                    type="single"
                    variant="outline"
                    spacing={2}
                    value={vm.segmentsListViewMode}
                    onValueChange={value => vm.setSegmentsListViewMode(value as ListViewMode)}>
                    <ToggleGroupItem
                        className="data-[state=on]:bg-slate-100 data-[state=on]:*:[svg]:stroke-slate-900"
                        value="list"
                        title="Toggle list"
                        aria-label="Toggle list">
                        <List />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        className="data-[state=on]:bg-slate-100 data-[state=on]:*:[svg]:stroke-slate-900"
                        value="grid"
                        title="Toggle grid"
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
