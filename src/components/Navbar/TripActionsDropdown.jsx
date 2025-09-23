import { useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
    ListEnd,
    Map,
    MapPinPlus,
} from 'lucide-react'
import InputDialog from '@/components/InputDialog'
import useUIOptionsViewModel from '@/components/Navbar/UIOptionsViewModel'
import useTripActionsViewModel from '@/components/Navbar/TripActionsViewModel'
import usePlanActionsViewModel from '@/components/Navbar/PlanActionsViewModel'
import useSegmentActionsViewModel from '@/components/Navbar/SegmentActionsViewModel'

const TripActionsDropdown = ({
    trip,
    plan,
} = {}) => {
    
    const uiOptionsViewModel = useUIOptionsViewModel()
    const tripActionsViewModel = useTripActionsViewModel(trip, plan)
    const planActionsViewModel = usePlanActionsViewModel(trip, plan)
    const segmentActionsViewModel = useSegmentActionsViewModel(trip, plan)
    
    useEffect(() => {
        
        if (trip?.name && !tripActionsViewModel.newTripName.length)
            tripActionsViewModel.setNewTripName(trip.name)
        
    }, [trip, tripActionsViewModel.newTripName])
    
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
                    <DropdownMenuItem onClick={() => tripActionsViewModel.setRenameTripDialogOpen(true)}>
                        <FolderPen className="text-yellow-500" /> Rename Trip
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={tripActionsViewModel.backupTrip}>
                        <FolderDown className="text-violet-500" /> Backup Trip
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="opacity-60">Plans</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => planActionsViewModel.setCreatePlanDialogOpen(true)}>
                        <FilePlus className="text-green-500" /> New Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => planActionsViewModel.setRenamePlanDialogOpen(true)}>
                        <FilePen className="text-yellow-500" /> Rename Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={planActionsViewModel.deletePlan}>
                        <FileX className="text-red-500" /> Delete Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={planActionsViewModel.clonePlan}>
                        <Files className="text-slate-500" /> Clone Plan
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="opacity-60">Segments</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={segmentActionsViewModel.addSegment}>
                        <MapPinPlus className="text-green-500" /> New Segment
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={segmentActionsViewModel.copySegmentNamesToClipboard}>
                        <ClipboardCopy className="text-slate-500" /> Copy Segment Names
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="opacity-60">Options</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {/* <DropdownMenuItem onClick={uiOptionsViewModel.toggleCascadeEnabled}>
                        <ListEnd className="text-teal-500" />
                        <Switch
                            id="toggle-cascade"
                            checked={uiOptionsViewModel.cascadeEnabled} />
                        <Label htmlFor="toggle-cascade">Cascade</Label>
                    </DropdownMenuItem>*/}
                    <DropdownMenuCheckboxItem
                        checked={uiOptionsViewModel.cascadeEnabled}
                        onCheckedChange={uiOptionsViewModel.setCascadeEnabled}
                        alignCheckboxRight>
                        <ListEnd className="text-teal-500" /> Cascade
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={uiOptionsViewModel.showMap}
                        onCheckedChange={uiOptionsViewModel.setShowMap}
                        alignCheckboxRight>
                        <Map className="text-amber-500" /> Show Map
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
            
            </DropdownMenuContent>
        
        </DropdownMenu>
        
        <InputDialog
            className="RenameTripDialog"
            open={tripActionsViewModel.renameTripDialogOpen}
            setOpen={tripActionsViewModel.setRenameTripDialogOpen}
            title="Rename Trip"
            description="Update the trip name."
            inputFieldLabel="New Trip Name"
            initialValue={trip?.name || ''}
            onSubmit={tripActionsViewModel.updateTrip('name')} />
        
        <InputDialog
            className="CreatePlanDialog"
            open={planActionsViewModel.createPlanDialogOpen}
            setOpen={planActionsViewModel.setCreatePlanDialogOpen}
            title="Create Plan"
            description="Create a new plan."
            inputFieldLabel="New Plan Name"
            initialValue={''}
            onSubmit={planActionsViewModel.createPlan} />
        
        <InputDialog
            className="RenamePlanDialog"
            open={planActionsViewModel.renamePlanDialogOpen}
            setOpen={planActionsViewModel.setRenamePlanDialogOpen}
            title="Rename Plan"
            description="Update the plan name."
            inputFieldLabel="New Plan Name"
            initialValue={plan?.name || ''}
            onSubmit={planActionsViewModel.updatePlan('name')} />
    
    </>)
    
}

export default TripActionsDropdown
