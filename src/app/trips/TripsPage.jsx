'use client'

import LoadingSpinner from '@/components/LoadingSpinner.jsx'
import useTripsPageViewModel from './TripsPageViewModel'
import TripCard from '@/components/TripCard'
import { Button } from '@/components/ui/button'
import { MapPinPlus, FolderUp } from 'lucide-react'
import { cn } from '@/utils'

const TripsPage = () => {
    
    const vm = useTripsPageViewModel()
    
    if (vm.tripsLoading) return (
        <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
        </div>
    )
    
    return (
        
        <div className="flex flex-col gap-4 p-8">
            
            <header className="flex items-center justify-between">
                <h1>Trips</h1>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="default"
                        disabled={vm.createTripMutation.isLoading}
                        onClick={vm.createNewTrip}>
                        <MapPinPlus />
                        {vm.createTripMutation.isLoading ? 'Creating...' : 'New Trip'}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={vm.navigateToImportTrips}>
                        <FolderUp />
                        Import
                    </Button>
                </div>
            </header>
            
            {!vm.trips?.data?.length && (
                <div>
                    <i>No trips found.</i>
                </div>
            )}
            
            <div className={cn('grid gap-2 grid-cols-1 md:grid-cols-4')}>
                {vm.trips?.data?.map(trip => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        onClick={() => vm.handleTripClick(trip.id)}
                        onDeleteTripClick={vm.onDeleteTripClick(trip.id)}/>
                ))}
            </div>
        
        </div>
        
    )
    
}

export default TripsPage
