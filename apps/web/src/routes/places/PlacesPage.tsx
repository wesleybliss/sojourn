import InputDialog from '@/components/InputDialog'
import ProtectedRoute from '@/components/ProtectedRoute'
import PlacesPageHeader from '@/routes/places/PlacesPageHeader'
import PlacesPagePlacesGrid from '@/routes/places/PlacesPagePlacesGrid'
import PlacesPageRecentSegments from '@/routes/places/PlacesPageRecentSegments'
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
                
                <PlacesPageRecentSegments recentSegments={vm.recentSegments} />
            
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
