import MapLibreMap from '@/components/MapLibreMap'
import SegmentsList from '@/components/SegmentsList'
import { cn } from '@/lib/utils'

const TripDetail = ({
    vm,
} = {}) => {
    
    return (
        
        <div className="Trip w-full flex flex-col flex-1 gap-4 p-4">
            
            <div className={cn('w-full', {
                'grid grid-cols-2 gap-2': vm.showMap,
                /* 'flex flex-col gap-2': !vm.showMap, */
            })}>
                
                <div className={cn('flex flex-col gap-2', {
                    'w-fit': vm.showMap,
                    'w-full': !vm.showMap,
                })}>
                    
                    {vm.trip && vm.segments?.length <= 0 && (
                        <p>You have no segments yet.</p>
                    )}
                    
                    {vm.segments?.length > 0 && (
                        <SegmentsList
                            segments={vm.segments}
                            getTotalDaysPerSegment={vm.getTotalDaysPerSegment}
                            getCumulativeDaysPerSegment={vm.getCumulativeDaysPerSegment} />
                    )}
                
                </div>
                
                {vm.showMap && <MapLibreMap latLng={vm.focusedLatLng} />}
            
            </div>
        
        </div>
        
    )
    
}

export default TripDetail
