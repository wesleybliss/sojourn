import { useWire } from '@forminator/react-wire'
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

const PlacesPageToolbarMenu = () => {
    
    const deletePlacesDialogOpen = useWire(store.deletePlacesDialogOpen)
    
    return (
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <EllipsisVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Place Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => deletePlacesDialogOpen.setValue(true)}>
                        <MapPinXInside className="size-4" />
                        Delete Places
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        
    )
    
}

export default PlacesPageToolbarMenu
