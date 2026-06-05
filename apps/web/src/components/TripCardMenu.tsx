import { useWire } from '@forminator/react-wire'
import { ID } from '@repo/shared/types'
import { EllipsisVertical, MapPinXInside } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import * as store from '@/store'

export interface TripCardMenuProps {
    tripId: ID
}

const TripCardMenu = ({
    tripId,
}: TripCardMenuProps) => {
    
    const deleteTripDialogId = useWire(store.deleteTripDialogId)
    
    return (
        
        <DropdownMenu>
            
            <DropdownMenuTrigger asChild>
                <Button className="rounded-full ring-0! focused:outline-none" variant="ghost" size="sm">
                    <EllipsisVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-50" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Trip Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={e => {
                            e.stopPropagation()
                            deleteTripDialogId.setValue(tripId)
                        }}>
                        <MapPinXInside className="size-4" />
                        Delete Trip
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        
        </DropdownMenu>
        
    )
    
}

export default TripCardMenu
