import ConfirmDialog from '@/components/ConfirmDialog'
import DebugTailwindMediaQueries from '@/components/DebugTailwindMediaQueries'
import InputDialog from '@/components/InputDialog'
import ProtectedRoute from '@/components/ProtectedRoute'
import PlacesPagePlaces from '@/routes/places/PlacesPagePlaces'
import PlacesPageRecentSegments from '@/routes/places/PlacesPageRecentSegments'
import PlacesPageToolbar from '@/routes/places/PlacesPageToolbar'
import usePlacesPageViewModel from '@/routes/places/PlacesPageViewModel'

const PlacesPage = () => {
    
    const vm = usePlacesPageViewModel()
    
    return (
        
        <ProtectedRoute>
            <DebugTailwindMediaQueries />
            <div className="flex flex-col gap-3 py-4">
                
                <PlacesPageToolbar
                    query={vm.search}
                    setQuery={vm.setSearch}
                    placesListViewMode={vm.placesListViewMode}
                    setPlacesListViewMode={vm.setPlacesListViewMode}
                    regionFilters={vm.regionFilters}
                    activeRegion={vm.activeRegion}
                    setActiveRegion={vm.setActiveRegion}
                    allChecked={vm.allChecked}
                    anyChecked={vm.anyChecked}
                    toggleAllChecked={vm.toggleAllChecked}
                    onAddPlaceClick={() => vm.setAddPlaceDialogOpen(true)} />
                
                <PlacesPagePlaces
                    isLoading={vm.isLoading}
                    filteredPlaces={vm.filteredPlaces}
                    placesListViewMode={vm.placesListViewMode}
                    hasChecked={vm.hasChecked}
                    toggleChecked={vm.toggleChecked}
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
            
            <ConfirmDialog
                open={vm.deletePlacesDialogOpen}
                title="Delete Places"
                message="Are you sure you want to delete these places?"
                cancelLabel="Cancel"
                onCancel={() => vm.setDeletePlacesDialogOpen(false)}
                confirmLabel="Delete Places"
                onConfirm={vm.handleDeletePlaces} />
        
        </ProtectedRoute>
        
    )
    
}

export default PlacesPage
