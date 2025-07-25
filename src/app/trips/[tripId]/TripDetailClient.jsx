'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { MapPinPlus } from 'lucide-react'
import TripCard from '@/components/TripCard'
import SegmentsGanttChart from '@/components/SegmentsGanttChart'
import MapLibreMap from '@/components/MapLibreMap'

export default function TripDetailClient({ initialTrip }) {
    const [trip] = useState(initialTrip)
    const [showMap, setShowMap] = useState(false)
    const [cascadeEnabled, setCascadeEnabled] = useState(false)
    const [focusedLatLng, setFocusedLatLng] = useState(undefined)

    const addSegment = async () => {
        // This would need to be implemented with the segments API
        console.log('Add segment functionality needs to be implemented')
    }

    // Simple segments display - in a real implementation, this would come from the segments API
    const segments = trip.segments || []

    return (
        <div className="Trip w-full flex flex-col flex-1 gap-4 p-4">
            {/* Trip Header - Simplified */}
            <header className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">{trip.name}</h1>
                    <p className="text-muted-foreground">{trip.description}</p>
                </div>
            </header>

            {/* Segments Header */}
            <header className="flex items-center justify-between">
                <h3>Segments: {segments?.length || '0'}</h3>
                <div className="flex items-center justify-end gap-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="toggle-cascade"
                            checked={cascadeEnabled}
                            onCheckedChange={setCascadeEnabled}
                        />
                        <Label htmlFor="toggle-cascade">Cascade</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="toggle-map"
                            checked={showMap}
                            onCheckedChange={setShowMap}
                        />
                        <Label htmlFor="toggle-map">Show Map</Label>
                    </div>
                    <Button
                        variant="outline"
                        onClick={addSegment}
                    >
                        <MapPinPlus />
                        New Segment
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2 w-fit">
                    {segments?.length <= 0 && (
                        <p>You have no segments yet.</p>
                    )}
                    {segments?.length > 0 && (
                        <div className="space-y-2">
                            {segments.map((segment, index) => (
                                <div key={segment.id || index} className="p-4 border rounded">
                                    <h4 className="font-semibold">{segment.name}</h4>
                                    <p className="text-sm text-muted-foreground">{segment.description}</p>
                                    {segment.startDate && (
                                        <p className="text-xs">
                                            {new Date(segment.startDate).toLocaleDateString()} - 
                                            {segment.endDate ? new Date(segment.endDate).toLocaleDateString() : 'No end date'}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {showMap && <MapLibreMap latLng={focusedLatLng} />}
            </div>

            {/* Gantt Chart */}
            {trip && segments?.length > 0 && (
                <div className="mt-4">
                    <SegmentsGanttChart planId={trip.id} />
                </div>
            )}

            {/* Trip Card for additional details */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Trip Details</h3>
                <TripCard trip={trip} />
            </div>
        </div>
    )
}