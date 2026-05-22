import useThrottledPlacePhotos from './useThrottledPlacePhotos'
import MapLibreMap from '@/components/MapLibreMap'
import SegmentsList from '@/components/segments/SegmentsList'
import { cn } from '@/utils'
import { Progress } from '@/components/ui/progress'
import SegmentsFilterToolbar from '@/components/segments/SegmentsFilterToolbar'
import SadFolderIcon from '@/components/graphics/SadFolderIcon'
import { TTripEditorViewModel } from '@/components/TripEditor/useTripEditorViewModel'

interface TripDetailProps {
    vm: TTripEditorViewModel
}

const TripDetail = ({
    vm,
}: TripDetailProps) => {
    
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
                    
                    {vm.segments?.length > 0 && (<>
                        <SegmentsFilterToolbar
                            className="w-full max-w-2xl mx-auto mb-4"
                            vm={vm} />
                        <SegmentsList
                            segments={vm.filteredSegments}
                            segmentsListViewMode={vm.segmentsListViewMode}
                            getTotalDaysPerSegment={vm.getTotalDaysPerSegment}
                            getCumulativeDaysPerSegment={vm.getCumulativeDaysPerSegment}
                            getSegmentPlanned={vm.getSegmentPlanned}
                            getSegmentCompleted={vm.getSegmentCompleted}
                            shufflePlaceCoverPhoto={vm.shufflePlaceCoverPhoto} />
                    </>)}
                    
                    {/* Only show empty state when trip is fully loaded, has a plan, and truly has no segments */}
                    {/* Don't show during fetching to avoid flash */}
                    {vm.trip && vm.currentPlan && !vm.isFetching && vm.segments?.length === 0 && (
                        <p className="text-center">You have no segments yet.</p>
                    )}
                    
                    {/* Show message when segments exist but all are filtered out (past dates) */}
                    {vm.segments?.length > 0 && vm.filteredSegments?.length === 0 && (
                        <div className="flex flex-col justify-center items-center gap-8">
                            <SadFolderIcon className="size-25 text-gray-500" />
                            <p className="text-center text-muted-foreground">
                                <b>All segments have elapsed.</b>
                            </p>
                            <p className="text-center text-muted-foreground">
                                Toggle the "show all" button at the top to see
                                past segments.
                            </p>
                        </div>
                    )}
                
                </div>
                
                {vm.showMap && <MapLibreMap latLng={[vm.focusedLatLng?.lat || 0, vm.focusedLatLng?.lng || 0]} />}
            
            </div>
            
            {/* Debug output */}
            <div className="mt-4 p-2 text-xs text-gray-500 border-t">
                Debug: Trip ID: {vm.trip?.id}, Plan ID: {vm.currentPlan?.id},
                Segments: {vm.segments?.length || 0}, Filtered: {vm.filteredSegments?.length || 0},
                isFetching: {String(vm.isFetching)}
            </div>
        
        </div>
        
    )
    
}

export default TripDetail
