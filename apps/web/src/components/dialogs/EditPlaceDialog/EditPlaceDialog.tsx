import { useWireState, useWireValue } from '@forminator/react-wire'
import { CirclePlus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import PlaceDetailsFields from '@/components/dialogs/EditPlaceDialog/PlaceDetailsFields'
import PlaceNoteField from '@/components/dialogs/EditPlaceDialog/PlaceNoteField'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useUpdatePlaceForm, { UpdatePlaceForm } from '@/hooks/forms/useUpdatePlaceForm'
import { useUpdatePlace } from '@/lib/queries/places'
import * as store from '@/store'

const EditPlaceDialog = () => {
    
    const currentTeamId = useWireValue(store.currentTeamId)
    const [updatePlaceDialogPlace, setUpdatePlaceDialogPlace] = useWireState(store.updatePlaceDialogPlace)
    
    const [isUpdatingPlace, setIsUpdatingPlace] = useState(false)
    
    const updatePlaceMutation = useUpdatePlace(currentTeamId)
    
    const updatePlace = useCallback(async (value: UpdatePlaceForm) => {
        
        setIsUpdatingPlace(true)
        
        try {
            console.log('@todo update place', value)
            /*const result = await createTripMutation.mutateAsync({
                ...value,
                teamId: currentTeamId,
            })
            const newTrip = result.data
            
            if (newTrip)
                router.push(`/${currentTeamId}/trips/${newTrip.id}`)*/
            
        } catch (e) {
            
            console.error('Error creating trip:', e)
            toast.error('Failed to create trip. Please try again.')
            
        }
        
        setIsUpdatingPlace(false)
        setUpdatePlaceDialogPlace(null)
        
    }, [updatePlaceMutation, setUpdatePlaceDialogPlace])
    
    const form = useUpdatePlaceForm(updatePlaceDialogPlace, updatePlace)
    
    const onCancel = () => setUpdatePlaceDialogPlace(null)
    
    return (
        
        <Dialog
            open={updatePlaceDialogPlace !== null}
            onOpenChange={(open: boolean) => !open && onCancel()}>
            
            <DialogContent className="sm:max-w-9/12 max-h-[80vh] overflow-hidden">
                
                <DialogHeader>
                    <DialogTitle>
                        Update Place
                    </DialogTitle>
                    <DialogDescription>
                        Update place details.
                    </DialogDescription>
                </DialogHeader>
                
                <form
                    className="grid grid-cols-1 lg:grid-cols-12 max-h-full overflow-y-auto mt-4"
                    onSubmit={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}>
                    
                    <div className="col-span-5 space-y-6">
                        <PlaceDetailsFields form={form} />
                    </div>
                    
                    <div className="col-span-1 flex justify-center">
                        <div className="w-px bg-muted h-full" />
                    </div>
                    
                    <div className="col-span-6 max-h-[45vh] overflow-y-auto pr-4 pb-4">
                        <form.Field name="notes" mode="array">
                            {field => (<>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <Label>Notes</Label>
                                    </div>
                                    {(field.state.value ?? []).length > 0 && (
                                        <PlaceNoteField
                                            form={form}
                                            field={field} />
                                    )}
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => field.pushValue({ name: '', content: '' })}>
                                                <CirclePlus data-icon="inline-start" />
                                                Add Note
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Add a new note
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </>)}
                        </form.Field>
                    </div>
                
                </form>
                
                <DialogFooter className="mt-3 justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isUpdatingPlace}
                        onClick={form.handleSubmit}>
                        {isUpdatingPlace && <Spinner data-icon="inline-start" />}
                        Create Trip
                    </Button>
                </DialogFooter>
            
            </DialogContent>
        
        </Dialog>
        
    )
    
}

export default EditPlaceDialog
