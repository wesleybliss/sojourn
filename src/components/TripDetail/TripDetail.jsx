import useThrottledPlacePhotos from './useThrottledPlacePhotos'
import MapLibreMap from '@/components/MapLibreMap'
import SegmentsList from '@/components/segments/SegmentsList'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import SegmentsFilterToolbar from '@/components/segments/SegmentsFilterToolbar'

const TripDetail = ({
    vm,
} = {}) => {
    
    const placePhotosVm = useThrottledPlacePhotos(vm.segments)
    
    return (
        
        <div className="Trip w-full flex flex-col flex-1 gap-4 p-4">
            
            {placePhotosVm.progressPercent > 0 && (
                <div className="w-1/2 mx-auto p-5 border border-slate-300 rounded-xl">
                    <p className="mb-2 text-sm">Updating places, please wait...</p>
                    <Progress
                        className="w-full"
                        value={placePhotosVm.progressPercent} />
                </div>
            )}
            
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
                    
                    {vm.segments?.length > 0 && (<>
                        <SegmentsFilterToolbar
                            className="w-full max-w-2xl mx-auto mb-4"
                            vm={vm} />
                        <SegmentsList
                            segments={vm.filteredSegments}
                            segmentsListShowCompleted={vm.segmentsListShowCompleted}
                            segmentsListViewMode={vm.segmentsListViewMode}
                            getTotalDaysPerSegment={vm.getTotalDaysPerSegment}
                            getCumulativeDaysPerSegment={vm.getCumulativeDaysPerSegment}
                            getSegmentPlanned={vm.getSegmentPlanned}
                            getSegmentCompleted={vm.getSegmentCompleted}/>
                    </>)}
                
                </div>
                
                {vm.showMap && <MapLibreMap latLng={vm.focusedLatLng} />}
            
            </div>
        
        </div>
        
    )
    
}

export default TripDetail
