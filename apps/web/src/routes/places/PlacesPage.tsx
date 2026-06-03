import dayjs from 'dayjs'

import InputDialog from '@/components/InputDialog'
import ProtectedRoute from '@/components/ProtectedRoute'
import PlacesPageHeader from '@/routes/places/PlacesPageHeader'
import PlacesPagePlacesGrid from '@/routes/places/PlacesPagePlacesGrid'
import PlacesPageSearch from '@/routes/places/PlacesPageSearch'
import usePlacesPageViewModel from '@/routes/places/PlacesPageViewModel'

const PlacesPage = () => {
    
    const vm = usePlacesPageViewModel()
    
    return (
        
        <ProtectedRoute>
            
            <div className="flex flex-col gap-8 py-4">
                
                <PlacesPageHeader
                    onAddPlaceClick={() => vm.setAddPlaceDialogOpen(true)} />
                
                <PlacesPageSearch
                    query={vm.search}
                    setQuery={vm.setSearch}
                    regionFilters={vm.regionFilters}
                    activeRegion={vm.activeRegion}
                    setActiveRegion={vm.setActiveRegion} />
                
                <PlacesPagePlacesGrid
                    isLoading={vm.isLoading}
                    filteredPlaces={vm.filteredPlaces}
                    getSegmentCountForPlace={vm.getSegmentCountForPlace}
                    toggleBookmark={vm.toggleBookmark} />
                
                <section className="section-card overflow-hidden">
                    <div className="border-b border-border/70 px-6 py-5">
                        <div className="eyebrow mb-2">Reference Feed</div>
                        <h2 className="text-2xl font-semibold tracking-[-0.04em]">Recently Viewed Segments</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            A compact log of the latest segment activity across your trip workspace.
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border/70 text-sm">
                            <thead className="bg-surface-container-low text-left text-xs uppercase
                                tracking-[0.18em] text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Trip</th>
                                    <th className="px-6 py-4 font-medium">Segment</th>
                                    <th className="px-6 py-4 font-medium">Travel window</th>
                                    <th className="px-6 py-4 font-medium">Updated</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {vm.recentSegments.slice(0, 8).map(segment => (
                                    <tr key={segment.id}>
                                        <td className="px-6 py-4 font-medium">{segment.tripName}</td>
                                        <td className="px-6 py-4">{segment.segmentName}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{segment.dateRange}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {dayjs(segment.updatedAt).format('MMM D, YYYY h:mm A')}
                                        </td>
                                    </tr>
                                ))}
                                {!vm.recentSegments.length && (
                                    <tr>
                                        <td className="px-6 py-8 text-muted-foreground" colSpan={4}>
                                            No trip segments are available yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            
            <InputDialog
                description="Create a saved place card with a generated cover image and planning notes scaffold."
                initialValue=""
                inputFieldLabel="Place name"
                onSubmit={vm.handleCreatePlace}
                open={vm.addPlaceDialogOpen}
                setOpen={vm.setAddPlaceDialogOpen}
                title="Add Place" />
        
        </ProtectedRoute>
        
    )
    
}

export default PlacesPage
