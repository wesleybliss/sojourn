import EditableTextField from '@/components/EditableTextField'
import { Button } from '@/components/ui/button'
import { FolderPen, FolderDown, BookPlus, X } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const TripHeader = ({
    vm,
}) => {
    
    return (
        
        <header className="flex items-center justify-between gap-4">
            
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-5">
                    <div className="flex items-center justify-between group">
                        <EditableTextField
                            value={vm.currentTrip?.name || ''}
                            placeholder="New trip"
                            onChange={vm.updateTrip('name')}>
                            <FolderPen className="opacity-0 group-hover:opacity-20 hover:opacity-100
                                transition-opacity ease-in-out duration-300" />
                        </EditableTextField>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>{vm.shengenData?.startDate?.format('MMM DD, YYYY')}</div>
                        <div>&rarr;</div>
                        <div className={cn({
                            'text-red-500': vm.shengenData?.isOver === true,
                        })}>
                            {vm.shengenData?.endDate?.format('MMM DD, YYYY')}
                        </div>
                        <div className="italic text-sm">
                            {vm.shengenData?.totalDays || '0'} days, {vm.shengenData?.remainingDays || '0'} remaining
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-12">
                    <div className="">
                        <p className="text-muted-foreground">
                            {vm.currentTrip?.description || 'New trip description'}
                        </p>
                    </div>
                    <div className="">
                        <Tabs defaultValue="">
                            <TabsList>
                                {vm.plans?.map(it => (
                                    <TabsTrigger
                                        key={it.id}
                                        value={it.id}
                                        asChild>
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <div
                                                className="hover:bg-accent hover:text-accent-foreground"
                                                onClick={() => vm.navigate(
                                                    `/trips/${vm.currentTrip.id}/plans/${it.id}`)}
                                                onDoubleClick={() => vm.renamePlan(it.id)}>
                                                {it.name}
                                            </div>
                                            <Button
                                                title="Delete plan"
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => vm.deletePlan(it.id)}>
                                                <X />
                                            </Button>
                                        </div>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>
                    <div className="">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
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
                </div>
            </div>
            
            <div className="flex items-center justify-end gap-2">
                <Button
                    title="Backup trip"
                    onClick={vm.backupTrip}>
                    <FolderDown />
                </Button>
            </div>
        
        </header>
        
    )
    
}

export default TripHeader
