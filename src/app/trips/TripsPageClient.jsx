'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TripCard from '@/components/TripCard'
import { Button } from '@/components/ui/button'
import { MapPinPlus, FolderUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createTrip, deleteTrip } from '@/lib/actions/trips'

export default function TripsPageClient({ initialTrips }) {
    const [trips, setTrips] = useState(initialTrips)
    const [isCreating, setIsCreating] = useState(false)
    const router = useRouter()

    const createNewTrip = async () => {
        setIsCreating(true)
        try {
            const newTrip = await createTrip({
                name: 'New Trip',
                description: '',
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            })
            
            setTrips(prevTrips => [...prevTrips, newTrip])
            router.push(`/trips/${newTrip.id}`)
        } catch (error) {
            console.error('Error creating trip:', error)
        } finally {
            setIsCreating(false)
        }
    }

    const onDeleteTripClick = (id) => async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!confirm('Are you sure you want to delete this trip?'))
            return

        try {
            await deleteTrip(id)
            setTrips(prevTrips => prevTrips.filter(trip => trip.id !== id))
        } catch (error) {
            console.error('Error deleting trip:', error)
        }
    }

    const navigateToImportTrips = () => {
        router.push('/import-trips')
    }

    const handleTripClick = (tripId) => {
        router.push(`/trips/${tripId}`)
    }

    return (
        <div className="flex flex-col gap-4 p-8">
            <header className="flex items-center justify-between">
                <h1>Trips</h1>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="default"
                        disabled={isCreating}
                        onClick={createNewTrip}
                    >
                        <MapPinPlus />
                        {isCreating ? 'Creating...' : 'New Trip'}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={navigateToImportTrips}
                    >
                        <FolderUp />
                        Import
                    </Button>
                </div>
            </header>
            
            <div className={cn('grid gap-2 grid-cols-4')}>
                {trips?.map(trip => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        onClick={() => handleTripClick(trip.id)}
                        onDeleteTripClick={onDeleteTripClick(trip.id)}
                    />
                ))}
            </div>
        </div>
    )
}