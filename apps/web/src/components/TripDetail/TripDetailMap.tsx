import dayjs from 'dayjs'

import MapLibreMap from '@/components/MapLibreMap'
import { TTripEditorViewModel } from '@/components/TripEditor/useTripEditorViewModel'

interface TripDetailMapProps {
    vm: TTripEditorViewModel
}

const TripDetailMap = ({
    vm,
}: TripDetailMapProps) => {
    
    const timelinePoints = vm.filteredSegments
        .filter(segment => segment.coordsLat && segment.coordsLng)
        .map(segment => ({
            coords: [segment.coordsLng!, segment.coordsLat!] as [number, number],
            name: segment.name,
        }))
    
    return (
        
        <section className="grid flex-1 gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
            <div className="section-card overflow-hidden">
                <MapLibreMap
                    className="min-h-[70vh] w-full"
                    latLng={vm.focusedLatLng ? [vm.focusedLatLng.lng, vm.focusedLatLng.lat] : undefined}
                    points={timelinePoints} />
            </div>
            <div className="section-card flex flex-col overflow-hidden">
                <div className="border-b border-border/70 px-5 py-4">
                    <div className="eyebrow mb-2">Map Context</div>
                    <h2 className="text-xl font-semibold tracking-[-0.04em]">Segment Cards</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Review route stops alongside the map and keep your next move visible.
                    </p>
                </div>
                <div className="scrollbar-minimal flex-1 space-y-3 overflow-y-auto p-4">
                    {vm.filteredSegments.map((segment, index) => (
                        <button
                            key={segment.id}
                            className="w-full rounded-2xl border border-border/70
                                bg-surface-container-low px-4 py-4 text-left
                                transition-colors hover:bg-surface-container"
                            onClick={() => {
                                if (segment.coordsLat && segment.coordsLng) {
                                    vm.setFocusedLatLng({
                                        lat: segment.coordsLat,
                                        lng: segment.coordsLng,
                                    })
                                }
                            }}
                            type="button">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="eyebrow mb-2">Stop {index + 1}</div>
                                    <div className="text-lg font-semibold">{segment.name}</div>
                                    <div className="mt-1 text-sm text-muted-foreground">
                                        {dayjs(segment.startDate as Date).format('MMM D')}
                                        &nbsp;-&nbsp;
                                        {dayjs(segment.endDate as Date).format('MMM D, YYYY')}
                                    </div>
                                </div>
                                <span className="rounded-full bg-primary px-3 py-1
                                    text-xs font-semibold text-primary-foreground">
                                    {vm.getStatusLabel(segment, vm)}
                                </span>
                            </div>
                            {segment.description && (
                                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                                    {segment.description}
                                </p>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
        
    )
    
}

export default TripDetailMap
