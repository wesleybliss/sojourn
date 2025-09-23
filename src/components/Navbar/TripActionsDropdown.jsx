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
import {
    Ellipsis,
    FolderPen,
    FilePlus,
    FolderDown,
    FilePen,
    FileX,
    Files,
    ClipboardCopy,
    MapPinPlus,
} from 'lucide-react'
import InputDialog from '@/components/InputDialog.jsx'

const TripActionsDropdown = ({
    trip,
    plan,
    onRenameTrip,
    onBackupTrip,
    onCreatePlan,
    onRenamePlan,
    onDeletePlan,
    onClonePlan,
    onAddSegment,
    onCopySegmentNames,
} = {}) => {
    
    const [newTripName, setNewTripName] = useState('')
    const [renameTripDialogOpen, setRenameTripDialogOpen] = useState(false)
    const [createPlanDialogOpen, setCreatePlanDialogOpen] = useState(false)
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
                        <FolderPen className="text-yellow-500" /> Rename Trip
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onBackupTrip}>
                        <FolderDown className="text-violet-500" /> Backup Trip
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="opacity-60">Plans</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setCreatePlanDialogOpen(true)}>
                        <FilePlus className="text-green-500" /> New Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setRenamePlanDialogOpen(true)}>
                        <FilePen className="text-yellow-500" /> Rename Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDeletePlan}>
                        <FileX className="text-red-500" /> Delete Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onClonePlan}>
                        <Files className="text-slate-500" /> Clone Plan
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="opacity-60">Segments</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={onAddSegment}>
                        <MapPinPlus className="text-green-500" /> New Segment
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onCopySegmentNames}>
                        <ClipboardCopy className="text-slate-500" /> Copy Segment Names
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
            className="CreatePlanDialog"
            open={createPlanDialogOpen}
            setOpen={setCreatePlanDialogOpen}
            title="Create Plan"
            description="Create a new plan."
            inputFieldLabel="New Plan Name"
            initialValue={''}
            onSubmit={onCreatePlan} />
        
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
