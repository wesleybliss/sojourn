import useTripsViewModel from './TripsViewModel'
import TripCard from '@/components/TripCard'
import { Button } from '@/components/ui/button'
import { MapPinPlus, FolderUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import ConfirmDialog from '@/components/ConfirmDialog'
import { noop } from '@/lib/utils'
import { cn } from '@/lib/utils'

const Trips = () => {
    
    const vm = useTripsViewModel()
    
    return (
        
        <div className="flex flex-col gap-4 p-8">
            
            <header className="flex items-center justify-between">
                <h1>Trips</h1>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="default"
                        onClick={vm.createNewTrip}>
                        <MapPinPlus />
                        New Trip
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={vm.startRestoreTrip}>
                        <FolderUp />
                    </Button>
                    <input
                        ref={vm.restoreTripFileRef}
                        className="hidden"
                        type="file"
                        accept=".json"
                        onChange={vm.restoreTrip} />
                </div>
            </header>
            
            <div className={cn('grid gap-2 grid-cols-4')}>
                {vm.trips?.map(it => (
                    <Link key={it.id} to={`/trips/${it.id}`}>
                        <TripCard trip={it} />
                    </Link>
                ))}
            </div>
            
            <ConfirmDialog
                open={vm.overwriteTripDialogOpen}
                title="Overwrite Trip"
                message="Trip or segments already exist. Do you want to overwrite?"
                cancelLabel="Cancel"
                onCancel={() => {
                    vm.setPendingImportData(null)
                    vm.setOverwriteTripDialogOpen(false)
                }}
                confirmLabel="Delete"
                onConfirm={vm.continueRestoreTrip} />
        
        </div>
        
    )
    
}

export default Trips
