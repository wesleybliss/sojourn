'use client'

import useNavbarViewModel from './NavbarViewModel'
import ThemeToggle from '@/components/ThemeToggle'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import AccountMenu from '@/components/AccountMenu.jsx'
import CurrentPlanSelector from '@/components/CurrentPlanSelector.jsx'
import { cn } from '@/lib/utils.js'
import EditableTextField from '@/components/EditableTextField.jsx'
import { BookPlus, FolderPen } from 'lucide-react'
import { toast } from 'sonner'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import TripActionsDropdown from '@/components/Navbar/TripActionsDropdown.jsx'

const Navbar = () => {
    
    const vm = useNavbarViewModel()
    
    return (
        
        <nav className="flex items-center justify-between px-4 py-2 bg-background border-b">
            
            <div className="flex items-center">
                
                <div className="text-sm font-bold">
                    Trip Planner
                </div>
                
                {vm.currentTrip && (<>
                    <div className="mx-2">/</div>
                    <div className="flex items-center justify-between group">
                        <EditableTextField
                            value={vm.currentTrip?.name || ''}
                            placeholder="New trip"
                            onChange={vm.updateTrip('name')}>
                            <FolderPen className="opacity-0 group-hover:opacity-20 hover:opacity-100
                                transition-opacity ease-in-out duration-300" />
                        </EditableTextField>
                    </div>
                </>)}
                
                <div className="ml-4">
                    <CurrentPlanSelector />
                </div>
                
                <div className="ml-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" title="Manage Plans">
                                <BookPlus />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuLabel>Create a Plan</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => toast('@todo')}>
                                    New
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={vm.clonePlan}>
                                    Clone Current Plan
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                {vm.shengenData && (
                    <div className="flex items-center gap-2 ml-4 text-sm">
                        <div>{vm.shengenData?.startDate?.format('MMM D, YYYY')}</div>
                        <div>&rarr;</div>
                        <div className={cn({
                            'text-red-500': vm.shengenData?.isOver === true,
                        })}>
                            {vm.shengenData?.endDate?.format('MMM D, YYYY')}
                        </div>
                        <div className="italic">
                            {vm.shengenData?.totalDays || '0'} days, {vm.shengenData?.remainingDays || '0'} remaining
                        </div>
                    </div>
                )}
            
            </div>
            
            <div className="flex gap-2 items-center">
                {vm.currentTrip && (
                    <TripActionsDropdown
                        trip={vm.currentTrip}
                        onRenameTrip={newTripName => vm.updateTrip('name')(newTripName)}
                        onBackupTrip={vm.backupTrip}
                        onRenamePlan={newPlanName => vm.renamePlan(vm.currentPlan.id)}/>
                )}
                <ThemeToggle variant="ghost" />
                {vm.user && <AccountMenu user={vm.user} />}
            </div>
        
        </nav>
        
    )
    
}

export default Navbar
