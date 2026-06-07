import CreatePlaceDialog from '@/components/dialogs/CreatePlaceDialog'
import DeletePlacesDialog from '@/components/dialogs/DeletePlacesDialog'
import ProtectedRoute from '@/components/ProtectedRoute'
import PlacesPagePlaces from '@/routes/places/PlacesPagePlaces'
import PlacesPageRecentSegments from '@/routes/places/PlacesPageRecentSegments'
import PlacesPageToolbar from '@/routes/places/PlacesPageToolbar'
import usePlacesPageViewModel from '@/routes/places/PlacesPageViewModel'

const PlacesPage = () => {
    
    const vm = usePlacesPageViewModel()
    
    return (
        
        <ProtectedRoute>
            
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
                    onAddPlaceClick={() => vm.setCreatePlaceDialogOpen(true)} />
                
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
            
            <CreatePlaceDialog onConfirm={vm.handleCreatePlace} />
            <DeletePlacesDialog onConfirm={vm.handleDeletePlaces} />
        
        </ProtectedRoute>
        
    )
    
}

export default PlacesPage
