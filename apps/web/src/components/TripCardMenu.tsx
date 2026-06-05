import { useWire } from '@forminator/react-wire'
import { ID } from '@repo/shared/types'
import { EllipsisVertical, ImagePlus,MapPinXInside } from 'lucide-react'
import { memo, useCallback, useRef, useState } from 'react'
import { toast } from 'sonner'

import ShuffleCoverPhotoDialog from '@/components/dialogs/ShuffleCoverPhotoDialog'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSub,
    DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useShuffleTripCoverPhoto } from '@/lib/queries/trip'
import * as store from '@/store'

export interface TripCardMenuProps {
    tripId: ID
    tripName: string
}

const TripCardMenu = memo(({
    tripId,
    tripName,
}: TripCardMenuProps) => {
    
    const shuffleTripCoverPhotoToastRef = useRef<string | number>(null)
    
    const deleteTripDialogId = useWire(store.deleteTripDialogId)
    
    const [shuffleTripCoverPhotoCustomDialogOpen, setShuffleTripCoverPhotoCustomDialogOpen] = useState(false)
    
    const shuffleTripCoverPhotoMutation = useShuffleTripCoverPhoto()
    
    const handleShuffleCoverPhoto = useCallback(async (topic?: string) => {
        
        shuffleTripCoverPhotoToastRef.current = toast.loading('Shuffling cover photo...')
        
        try {
            
            await shuffleTripCoverPhotoMutation.mutateAsync({
                tripId,
                topic: topic ?? tripName,
            })
            
        } catch (e) {
            
            console.error('Error shuffling cover photo:', e)
            toast.dismiss(shuffleTripCoverPhotoToastRef.current)
            toast.error('Failed to shuffle cover photo')
            
        }
        
        toast.dismiss(shuffleTripCoverPhotoToastRef.current)
        
    }, [tripId, tripName, shuffleTripCoverPhotoMutation, shuffleTripCoverPhotoToastRef])
    
    return (<>
        
        <DropdownMenu>
            
            <DropdownMenuTrigger asChild>
                <Button className="rounded-full ring-0! focused:outline-none" variant="ghost" size="sm">
                    <EllipsisVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-50" align="end">
                <DropdownMenuGroup>
                    
                    <DropdownMenuLabel>Trip Actions</DropdownMenuLabel>
                    
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <ImagePlus className="size-4" />
                            Cover Photo
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleShuffleCoverPhoto()
                                }}>
                                    Random
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setShuffleTripCoverPhotoCustomDialogOpen(true)
                                }}>
                                    Custom
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    
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
        
        <ShuffleCoverPhotoDialog
            open={shuffleTripCoverPhotoCustomDialogOpen}
            setOpen={setShuffleTripCoverPhotoCustomDialogOpen}
            initialValue={tripName}
            onConfirm={handleShuffleCoverPhoto} />
    
    </>)
    
})

export default TripCardMenu
