import { ComponentProps } from 'react'

import { Card } from '@/components/ui/card'
import { Map, MapControls } from '@/components/ui/map'
import { cn } from '@/utils'

interface TripMapProps extends ComponentProps<'div'> {
    className?: string
    center?: [number, number]
}

const TripMap = ({
    className,
    center = [-74.0060, 40.7128],
}: TripMapProps) => {
    
    return (
        
        <Card className={cn('h-80 p-0 overflow-hidden', className)}>
            <Map center={center} zoom={11}>
                <MapControls />
            </Map>
        </Card>
        
    )
    
}

export default TripMap
