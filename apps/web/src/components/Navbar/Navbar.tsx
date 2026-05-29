import { cn } from '@repo/shared/utils'
import { FolderUp, Map as MapIcon, MapPlus, TableProperties } from 'lucide-react'

import AccountMenu from '@/components/AccountMenu'
import CurrentPlanSelector from '@/components/CurrentPlanSelector'
import TripActionsDropdown from '@/components/Navbar/TripActionsDropdown'
import useNavbarViewModel from '@/components/Navbar/useNavbarViewModel'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import { Button } from '@/components/ui/button'

const Navbar = () => {
    
    const vm = useNavbarViewModel()
    
    return (
        
        <header className="sticky top-0 z-20 border-b border-border/70
            bg-surface-container-lowest/92 backdrop-blur rounded-lg">
            
            <div className="flex flex-col gap-4 px-5 py-4 lg:px-8">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                        <div className="eyebrow mb-2">
                            {vm.isTripWorkspace
                                ? 'Trip Workspace'
                                : vm.isPlacesPage
                                    ? 'Saved Places'
                                    : 'My Trips'}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="min-w-0">
                                <h1 className="truncate text-2xl font-semibold tracking-[-0.04em] lg:text-3xl">
                                    {vm.title}
                                </h1>
                                <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
                                    {vm.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            disabled={vm.createTripMutation.isPending}
                            onClick={vm.handleCreateTrip}>
                            <MapPlus />
                            {vm.createTripMutation.isPending ? 'Creating...' : 'New Trip'}
                        </Button>
                        <Button
                            variant="outline"
                            disabled={vm.backupMutation.isPending}
                            onClick={vm.handleImportOrBackup}>
                            <FolderUp />
                            {vm.backupMutation.isPending ? 'Working...' : vm.importButtonLabel}
                        </Button>
                        {vm.currentTrip && vm.isTripWorkspace && (
                            <TripActionsDropdown
                                trip={vm.currentTrip}
                                plan={vm.currentPlan} />
                        )}
                        <ThemeSwitcher />
                        <AccountMenu />
                    </div>
                </div>
                
                {vm.isTripWorkspace && vm.currentTrip && (
                    <div
                        className="flex flex-col gap-3 rounded-2xl border border-border/60
                            bg-surface-container-low px-4 py-3
                            lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                            <div className="min-w-52">
                                <CurrentPlanSelector />
                            </div>
                            <div
                                className="inline-flex w-fit items-center gap-1 rounded-full
                                    border border-border/70 bg-surface-container-lowest p-1">
                                <button
                                    className={cn(
                                        'inline-flex items-center gap-2 rounded-full px-3 py-1.5',
                                        'text-sm font-medium transition-colors',
                                        !vm.showMap
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-accent',
                                    )}
                                    onClick={() => vm.setShowMap(false)}
                                    type="button">
                                    <TableProperties className="size-4" />
                                    Itinerary
                                </button>
                                <button
                                    className={cn(
                                        'inline-flex items-center gap-2 rounded-full px-3 py-1.5',
                                        'text-sm font-medium transition-colors',
                                        vm.showMap
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-accent',
                                    )}
                                    onClick={() => vm.setShowMap(true)}
                                    type="button">
                                    <MapIcon className="size-4" />
                                    Trip Map
                                </button>
                            </div>
                            <div>
                                <Button onClick={() => vm.setIsTripEditMode(!vm.isTripEditMode)}>
                                    Edit Trip
                                </Button>
                            </div>
                        </div>
                        <div
                            className="flex flex-wrap items-center gap-2 text-xs
                                text-muted-foreground">
                            <span
                                className="rounded-full bg-surface-container-high px-3 py-1
                                    font-medium text-foreground">
                                {vm.currentTrip.name}
                            </span>
                            {vm.currentPlan && (
                                <span className="rounded-full border border-border/70 px-3 py-1">
                                    Active plan: {vm.currentPlan.name}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        
        </header>
        
    )
    
}

export default Navbar
