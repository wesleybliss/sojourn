import { useWireState, useWireValue } from '@forminator/react-wire'
import { cn } from '@repo/shared/utils'
import { FolderUp, Map as MapIcon, MapPlus, PanelLeftClose, TableProperties } from 'lucide-react'
import { toast } from 'sonner'

import AccountMenu from '@/components/AccountMenu'
import CurrentPlanSelector from '@/components/CurrentPlanSelector'
import TripActionsDropdown from '@/components/Navbar/TripActionsDropdown'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { useBackupTrips } from '@/lib/queries/backups'
import { useCreateTripMutation } from '@/lib/queries/trip'
import { Link, usePathname, useRouter } from '@/lib/router'
import * as store from '@/store'

const Navbar = () => {
    
    const router = useRouter()
    const pathname = usePathname()
    
    const currentTrip = useWireValue(store.currentTrip)
    const currentPlan = useWireValue(store.currentPlan)
    const [showMap, setShowMap] = useWireState(store.showMap)
    
    const createTripMutation = useCreateTripMutation()
    const backupMutation = useBackupTrips()
    
    const isTripWorkspace = pathname?.startsWith('/trips/')
    const isPlacesPage = pathname?.startsWith('/places')
    const isImportPage = pathname?.startsWith('/import-trips')
    const title = isTripWorkspace
        ? currentTrip?.name || 'Trip Planner'
        : isPlacesPage
            ? 'Future Destinations'
            : isImportPage
                ? 'Import & Restore'
                : 'Ongoing Journeys'
    
    const subtitle = isTripWorkspace
        ? currentTrip?.description || 'Operational view across segments, timing, and route context.'
        : isPlacesPage
            ? 'Research saved destinations, notes, and travel windows in one workspace.'
            : isImportPage
                ? 'Bring in prior backups or stage new itineraries.'
                : 'Track active itineraries, their latest changes, and next planning steps.'
    
    const importButtonLabel = isTripWorkspace ? 'Backup Trip' : 'Import / Backup'
    
    const handleCreateTrip = async () => {
        
        try {
            const result = await createTripMutation.mutateAsync({
                name: 'New Trip',
                description: '',
            })
            
            if (result.data)
                router.push(`/trips/${result.data.id}`)
        } catch (error) {
            console.error('Navbar.handleCreateTrip', error)
            toast.error('Failed to create trip')
        }
        
    }
    
    const handleImportOrBackup = async () => {
        
        if (isTripWorkspace && currentTrip) {
            try {
                await backupMutation.mutateAsync({
                    type: 'single',
                    tripId: currentTrip.id,
                })
                toast.success('Backup generated')
            } catch (error) {
                console.error('Navbar.handleImportOrBackup', error)
                toast.error('Backup failed')
            }
            
            return
        }
        
        router.push('/import-trips')
    }
    
    return (
        
        <header
            className="sticky top-0 z-20 border-b border-border/70
                bg-surface-container-lowest/92 backdrop-blur">
            <div className="flex flex-col gap-4 px-5 py-4 lg:px-8">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                        <div className="eyebrow mb-2">
                            {isTripWorkspace
                                ? 'Trip Workspace'
                                : isPlacesPage
                                    ? 'Saved Places'
                                    : 'Dashboard'}
                        </div>
                        <div className="flex items-center gap-3">
                            {!isTripWorkspace && (
                                <Link
                                    href="/"
                                    className="hidden rounded-full border border-border/70 px-2.5 py-1
                                        text-xs font-medium text-muted-foreground transition-colors
                                        hover:bg-accent hover:text-accent-foreground lg:inline-flex">
                                    <PanelLeftClose className="size-3.5" />
                                    Home
                                </Link>
                            )}
                            <div className="min-w-0">
                                <h1 className="truncate text-2xl font-semibold tracking-[-0.04em] lg:text-3xl">
                                    {title}
                                </h1>
                                <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
                                    {subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            className="rounded-full"
                            disabled={createTripMutation.isPending}
                            onClick={handleCreateTrip}>
                            <MapPlus />
                            {createTripMutation.isPending ? 'Creating...' : 'New Trip'}
                        </Button>
                        <Button
                            className="rounded-full"
                            variant="outline"
                            disabled={backupMutation.isPending}
                            onClick={handleImportOrBackup}>
                            <FolderUp />
                            {backupMutation.isPending ? 'Working...' : importButtonLabel}
                        </Button>
                        {currentTrip && isTripWorkspace && (
                            <TripActionsDropdown
                                trip={currentTrip}
                                plan={currentPlan} />
                        )}
                        <ThemeSwitcher />
                        <AccountMenu />
                    </div>
                </div>
                
                {isTripWorkspace && currentTrip && (
                    <div
                        className="flex flex-col gap-3 rounded-2xl border border-border/60
                            bg-surface-container-low px-4 py-3
                            lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                            <div className="min-w-[13rem]">
                                <CurrentPlanSelector />
                            </div>
                            <div
                                className="inline-flex w-fit items-center gap-1 rounded-full
                                    border border-border/70 bg-surface-container-lowest p-1">
                                <button
                                    className={cn(
                                        'inline-flex items-center gap-2 rounded-full px-3 py-1.5',
                                        'text-sm font-medium transition-colors',
                                        !showMap
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-accent',
                                    )}
                                    onClick={() => setShowMap(false)}
                                    type="button">
                                    <TableProperties className="size-4" />
                                    Itinerary
                                </button>
                                <button
                                    className={cn(
                                        'inline-flex items-center gap-2 rounded-full px-3 py-1.5',
                                        'text-sm font-medium transition-colors',
                                        showMap
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-accent',
                                    )}
                                    onClick={() => setShowMap(true)}
                                    type="button">
                                    <MapIcon className="size-4" />
                                    Trip Map
                                </button>
                            </div>
                        </div>
                        <div
                            className="flex flex-wrap items-center gap-2 text-xs
                                text-muted-foreground">
                            <span
                                className="rounded-full bg-surface-container-high px-3 py-1
                                    font-medium text-foreground">
                                {currentTrip.name}
                            </span>
                            {currentPlan && (
                                <span className="rounded-full border border-border/70 px-3 py-1">
                                    Active plan: {currentPlan.name}
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
