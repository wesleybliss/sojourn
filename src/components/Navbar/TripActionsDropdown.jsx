import { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.jsx'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import InputDialog from '@/components/InputDialog.jsx'

const TripActionsDropdown = ({
    trip,
    plan,
    onRenameTrip,
    onBackupTrip,
    onRenamePlan,
} = {}) => {
    
    const [newTripName, setNewTripName] = useState('')
    const [renameTripDialogOpen, setRenameTripDialogOpen] = useState(false)
    const [renamePlanDialogOpen, setRenamePlanDialogOpen] = useState(false)
    
    useEffect(() => {
        
        if (trip?.name && !newTripName.length)
            setNewTripName(trip.name)
        
    }, [trip, newTripName])
    
    return (<>
        
        <DropdownMenu>
            
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Ellipsis className="h-5 w-5" />
                    <span className="sr-only">Trip actions</span>
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="opacity-60">Trips</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setRenameTripDialogOpen(true)}>
                        Rename Trip
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onBackupTrip}>
                        Backup Trip
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="opacity-60">Plans</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={onRenamePlan}>
                        Rename Plan
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        
        </DropdownMenu>
        
        <InputDialog
            className="RenameTripDialog"
            open={renameTripDialogOpen}
            setOpen={setRenameTripDialogOpen}
            title="Rename Trip"
            description="Update the trip name."
            inputFieldLabel="New Trip Name"
            initialValue={trip?.name || ''}
            onSubmit={onRenameTrip} />
        
        <InputDialog
            className="RenamePlanDialog"
            open={renamePlanDialogOpen}
            setOpen={setRenamePlanDialogOpen}
            title="Rename Plan"
            description="Update the plan name."
            inputFieldLabel="New Plan Name"
            initialValue={plan?.name || ''}
            onSubmit={onRenamePlan} />
    
    </>)
    
}

export default TripActionsDropdown
