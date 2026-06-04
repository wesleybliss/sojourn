import { Segment } from '@repo/shared/types/database'
import dayjs from 'dayjs'
import { ComponentProps, memo, useMemo } from 'react'

import { Card } from '@/components/ui/card'
import { Map, MapControls, MapMarker, MapRoute,MarkerContent, MarkerPopup } from '@/components/ui/map'
import { cn } from '@/utils'

interface TripMapProps extends ComponentProps<'div'> {
    className?: string
    center?: [number, number]
    zoom?: number
    segments?: Segment[]
}

const coordsNYC: [number, number] = [-74.0060, 40.7128]

const TripMap = memo(({
    className,
    center,
    zoom = 5,
    segments = [],
}: TripMapProps) => {
    
    const validSegments = useMemo(() => (
        segments
            .filter(s => s.coordsLat && s.coordsLng)
            .sort((a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf())
    ), [segments])
    
    const firstSegment = useMemo(() => validSegments[0], [validSegments])
    
    const routeCoordinates = useMemo(() => (
        validSegments.map(s => [s.coordsLng!, s.coordsLat!] as [number, number])
    ), [validSegments])
    
    const centerCoords = useMemo<[number, number]>(() => {
        
        if (center) return center
        
        if (firstSegment?.coordsLat && firstSegment?.coordsLng)
            return [firstSegment.coordsLng, firstSegment.coordsLat]
        
        return coordsNYC
        
    }, [center, firstSegment?.coordsLat, firstSegment?.coordsLng])
    console.log('TripMap', {
        segments,
        validSegments,
        firstSegment,
        routeCoordinates,
        centerCoords,
    })
    return (
        
        <Card className={cn('h-80 p-0 overflow-hidden', className)}>
            
            <Map center={centerCoords} zoom={zoom}>
                
                <MapControls />
                
                {routeCoordinates.length >= 2 && (
                    <MapRoute
                        coordinates={routeCoordinates}
                        color="#4285F4"
                        width={3}
                        opacity={0.8} />
                )}
                
                {validSegments.map(segment => (
                    <MapMarker
                        key={segment.id}
                        longitude={segment.coordsLng!}
                        latitude={segment.coordsLat!}>
                        <MarkerContent>
                            <div
                                className="h-4 w-4 rounded-full border-2 border-white shadow-lg"
                                style={{ backgroundColor: segment.color ?? '#3b82f6' }}/>
                        </MarkerContent>
                        <MarkerPopup closeButton>
                            <div className="text-sm font-medium">{segment.name}</div>
                            {segment.description && (
                                <div className="mt-1 text-xs text-muted-foreground">
                                    {segment.description}
                                </div>
                            )}
                        </MarkerPopup>
                    </MapMarker>
                ))}
            
            </Map>
        
        </Card>
        
    )
    
})

export default TripMap
