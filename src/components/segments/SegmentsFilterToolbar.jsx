import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'

const SegmentsFilterToolbar = ({
    className = '',
    vm,
} = {}) => {
    
    return (
        
        <div className={`flex flex-col gap-2 ${className}`}>
            
            <Input
                type="text"
                placeholder="Filter by name, date, etc..."
                value={vm.segmentsFilterQuery}
                onChange={e => vm.setSegmentsFilterQuery(e.target.value)}
                onKeyUp={e => e.key === 'Escape' && vm.setSegmentsFilterQuery('')} />
            
            {/* <div className="flex items-center gap-2">
                <Toggle variant="outline">
                    Testing
                </Toggle>
            </div> */}
        
        </div>
        
    )
    
}

export default SegmentsFilterToolbar
