"use client"
import Link from 'next/link'
import TripCard from '@/components/TripCard'

/**
 * Client component for rendering a list of trips.
 * Each card links to the trip detail page.
 */
export default function TripsList({ trips }) {
    return (
        <div className="grid gap-4 grid-cols-4 p-8">
            {trips.map(trip => (
                <Link key={trip.id} href={`/trips/${trip.id}`}>
                    <TripCard trip={trip} />
                </Link>
            ))}
        </div>
    )
}
