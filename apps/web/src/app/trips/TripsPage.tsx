'use client'

import { cn } from '@repo/shared/utils'
import { FolderUp,MapPinPlus } from 'lucide-react'

import LoadingSpinner from '@/components/LoadingSpinner'
import TripCard from '@/components/TripCard'
import { Button } from '@/components/ui/button'

import useTripsPageViewModel from './TripsPageViewModel'

const TripsPage = () => {
    
    const vm = useTripsPageViewModel()
    
    if (vm.tripsLoading) return (
        <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
        </div>
    )
    
    return (
        
        <div data-testid="TripsPage" className="flex flex-col gap-4 p-8">
            
            <header className="flex items-center justify-between">
                <h1>Trips</h1>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="default"
                        disabled={vm.createTripMutation.isPending}
                        onClick={vm.createNewTrip}>
                        <MapPinPlus />
                        {vm.createTripMutation.isPending ? 'Creating...' : 'New Trip'}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={vm.navigateToImportTrips}>
                        <FolderUp />
                        Import
                    </Button>
                </div>
            </header>
            
            {!vm.trips?.length && (
                <div>
                    <i>No trips found.</i>
                </div>
            )}
            
            <div className={cn('grid gap-2 grid-cols-1 md:grid-cols-4')}>
                {vm.trips?.map(trip => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        onClick={() => vm.handleTripClick(trip.id)}
                        onDeleteTripClick={e => vm.onDeleteTripClick(trip.id)(e)} />
                ))}
            </div>
        
        </div>
        
    )
    
}

export default TripsPage
