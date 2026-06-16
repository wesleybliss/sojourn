import { cn } from '@repo/shared/utils'
import { RecentUpdate, SegmentStatus, SegmentStatuses, Trip } from '@shared/types'
import dayjs from 'dayjs'
import { FolderUp, MapPlus } from 'lucide-react'

import CreateTripDialog from '@/components/dialogs/CreateTripDialog'
import DeleteTripDialog from '@/components/dialogs/DeleteTripDialog'
import LoadingSpinner from '@/components/LoadingSpinner'
import TripCard from '@/components/trips/TripCard'
import { Button } from '@/components/ui/button'

import useTripsPageViewModel from './TripsPageViewModel'

type TripWithCount = Trip & {
    segmentCount?: number
}

const recentUpdateClasses: Record<SegmentStatus, string> = {
    [SegmentStatuses.confirmed]: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/55 dark:text-emerald-300',
    [SegmentStatuses.waitlist]: 'bg-amber-100 text-amber-700 dark:bg-amber-950/55 dark:text-amber-300',
    [SegmentStatuses.actionNeeded]: 'bg-rose-100 text-rose-700 dark:bg-rose-950/55 dark:text-rose-300',
}

const TripsPage = () => {
    
    const vm = useTripsPageViewModel()
    const trips = vm.trips as TripWithCount[]
    
    const recentUpdates: RecentUpdate[] = trips
        .flatMap(trip => (
            (trip.plans || []).flatMap(plan => (
                (plan.segments || []).map(segment => ({
                    tripId: trip.id,
                    tripName: trip.name,
                    planName: plan.name,
                    segmentName: segment.name,
                    updatedAt: segment.updatedAt as Date,
                    status: segment.flightBooked && segment.stayBooked
                        ? SegmentStatuses.confirmed
                        : segment.flightBooked || segment.stayBooked
                            ? SegmentStatuses.waitlist
                            : SegmentStatuses.actionNeeded,
                    dateRange: [
                        dayjs(segment.startDate as Date).format('MMM D'),
                        dayjs(segment.endDate as Date).format('MMM D'),
                    ].join(' - '),
                }))
            ))
        ))
        .sort((a, b) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf())
        .slice(0, 8)
    
    if (vm.tripsLoading) return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <LoadingSpinner />
        </div>
    )
    
    return (
        
        <div data-testid="TripsPage" className="flex flex-col gap-8 py-3">
            
            {!trips.length && (
                <div
                    className="section-card flex flex-col items-center justify-center gap-4
                        border-dashed px-6 py-16 text-center">
                    <div className="eyebrow">No Data</div>
                    <p className="max-w-md text-muted-foreground">
                        No trips exist yet. Start with a new itinerary and the workspace
                        will begin populating recent updates automatically.
                    </p>
                    <Button onClick={vm.onCreateTripClick}>
                        <MapPlus />
                        Plan a New Adventure
                    </Button>
                </div>
            )}
            
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                
                {trips.length > 0 && (
                    <div
                        data-testid="TripsPage-CreateTripCard"
                        className="group flex min-h-104 flex-col justify-between rounded-[14px]
                            border border-dashed border-border/80 bg-surface-container
                            px-5 py-6 text-left transition-colors hover:border-primary/30 hover:bg-surface-container">
                        <div>
                            <span
                                className="inline-flex size-12 items-center justify-center rounded-xl
                                    bg-primary text-primary-foreground">
                                <MapPlus className="size-5" />
                            </span>
                            <div className="mt-6">
                                <div className="font-headline text-2xl font-semibold">
                                    Plan a New Adventure
                                </div>
                                <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                                    Generate a fresh trip shell, default plan,
                                    and opening segment with one action.
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex justify-end items-center gap-2 text-sm font-medium text-muted-foreground
                                transition-colors group-hover:text-foreground">
                            <Button
                                className="cursor-pointer"
                                variant="secondary"
                                onClick={vm.onCreateTripClick}>
                                <MapPlus className="size-4" />
                                Start Now &rarr;
                            </Button>
                        </div>
                    </div>
                )}
                
                {trips.map(trip => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        onClick={() => vm.handleTripClick(trip.id)} />
                ))}
            
            </section>
            
            {trips.length > 0 && (
                <section className="section-card overflow-hidden">
                    <div
                        className="flex flex-col gap-2 border-b border-border/70 px-6 py-5
                            lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="eyebrow mb-2">Ops Feed</div>
                            <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                                Recent Updates
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Latest itinerary edits and booking states across all active journeys.
                            </p>
                        </div>
                        <Button
                            className="rounded-full"
                            onClick={vm.navigateToImportTrips}
                            variant="outline">
                            <FolderUp />
                            Import Trips
                        </Button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border/70 text-sm">
                            <thead className="bg-surface-container-low text-left text-xs
                                uppercase tracking-[0.18em] text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Trip</th>
                                    <th className="px-6 py-4 font-medium">Segment</th>
                                    <th className="px-6 py-4 font-medium">Plan</th>
                                    <th className="px-6 py-4 font-medium">Window</th>
                                    <th className="px-6 py-4 font-medium">Updated</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {recentUpdates.length ? recentUpdates.map(update => (
                                    <tr
                                        key={`${update.tripId}-${update.segmentName}-${update.updatedAt}`}>
                                        <td className="px-6 py-4 font-medium">{update.tripName}</td>
                                        <td className="px-6 py-4">{update.segmentName}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {update.planName}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {update.dateRange}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {dayjs(update.updatedAt).format('MMM D, YYYY h:mm A')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={cn(
                                                    'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                                                    recentUpdateClasses[update.status],
                                                )}>
                                                {update.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td className="px-6 py-8 text-muted-foreground" colSpan={6}>
                                            No segment edits yet. Create or update a trip
                                            to populate the activity feed.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
            
            <CreateTripDialog />
            
            <DeleteTripDialog
                onConfirm={vm.handleDeleteTrip}
                isLoading={vm.isDeletingTrip} />
        
        </div>
        
    )
    
}

export default TripsPage
