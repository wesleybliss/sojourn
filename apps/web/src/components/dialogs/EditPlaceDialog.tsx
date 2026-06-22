import { useWireState, useWireValue } from '@forminator/react-wire'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { CreateTripForm, createTripFormSchema } from '@/hooks/forms/useCreateTripForm'
import useUpdatePlaceForm, {
    createPlaceFormSchema,
    UpdatePlaceForm,
    updatePlaceFormSchema,
} from '@/hooks/forms/useUpdatePlaceForm'
import { useUpdatePlace } from '@/lib/queries/places'
import { useCreatePlaceMutation } from '@/lib/queries/trip'
import * as store from '@/store'

const EditPlaceDialog = () => {
    
    const currentTeamId = useWireValue(store.currentTeamId)
    const [updatePlaceDialogPlace, setUpdatePlaceDialogPlace] = useWireState(store.updatePlaceDialogPlace)
    
    const [isUpdatingPlace, setIsUpdatingPlace] = useState(false)
    
    const updatePlaceMutation = useUpdatePlace(currentTeamId)
    
    const updatePlace = useCallback(async (value: UpdatePlaceForm) => {
        
        setIsUpdatingPlace(true)
        
        try {
            console.log('@todo update place')
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
            
            <DialogContent>
                
                <DialogHeader>
                    <DialogTitle>
                        Update Place
                    </DialogTitle>
                    <DialogDescription>
                        Update place details.
                    </DialogDescription>
                </DialogHeader>
                
                <form className="block space-y-6" onSubmit={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}>
                    
                    <div className="space-y-0">
                        <form.Field
                            name="name"
                            validators={{
                                onChange: updatePlaceFormSchema.shape.name,
                            }}>
                            {field => (
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={field.state.value}
                                        onChange={e => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur} />
                                </div>
                            )}
                        </form.Field>
                        <p className="p-2 text-muted-foreground text-sm">
                            <i>Note: changing the default place name is not recommended.</i>
                        </p>
                    </div>
                    
                    
                    <form.Field
                        name="coverImageUrl"
                        validators={{
                            onChange: updatePlaceFormSchema.shape.coverImageUrl,
                        }}>
                        {field => (
                            <div className="space-y-2">
                                <Label htmlFor="coverImageUrl">
                                    Cover Image
                                </Label>
                                <Input
                                    type="text"
                                    name="coverImageUrl"
                                    value={field.state.value}
                                    onChange={e => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    disabled />
                            </div>
                        )}
                    </form.Field>
                    
                    <form.Field
                        name="focus"
                        validators={{
                            onChange: updatePlaceFormSchema.shape.focus,
                        }}>
                        {field => (
                            <div className="space-y-2">
                                <Label htmlFor="focus">
                                    Focus
                                </Label>
                                <Input
                                    type="text"
                                    name="focus"
                                    value={field.state.value}
                                    onChange={e => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur} />
                            </div>
                        )}
                    </form.Field>
                    
                    <form.Field
                        name="quickTip"
                        validators={{
                            onChange: updatePlaceFormSchema.shape.quickTip,
                        }}>
                        {field => (
                            <div className="space-y-2">
                                <Label htmlFor="quickTip">
                                    Quick Tip
                                </Label>
                                <Input
                                    type="text"
                                    name="quickTip"
                                    value={field.state.value}
                                    onChange={e => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur} />
                            </div>
                        )}
                    </form.Field>
                    
                    <form.Field
                        name="personalNotes"
                        validators={{
                            onChange: updatePlaceFormSchema.shape.personalNotes,
                        }}>
                        {field => (
                            <div className="space-y-2">
                                <Label htmlFor="personalNotes">
                                    Personal Notes
                                </Label>
                                <Input
                                    type="text"
                                    name="personalNotes"
                                    value={field.state.value}
                                    onChange={e => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur} />
                            </div>
                        )}
                    </form.Field>
                    
                    <form.Field
                        name="region"
                        validators={{
                            onChange: updatePlaceFormSchema.shape.region,
                        }}>
                        {field => (
                            <div className="space-y-2">
                                <Label htmlFor="region">
                                    Region
                                </Label>
                                <Input
                                    type="text"
                                    name="region"
                                    value={field.state.value}
                                    onChange={e => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur} />
                            </div>
                        )}
                    </form.Field>
                    
                    <form.Field
                        name="travelWindow"
                        validators={{
                            onChange: updatePlaceFormSchema.shape.travelWindow,
                        }}>
                        {field => (
                            <div className="space-y-2">
                                <Label htmlFor="travelWindow">
                                    Travel Window
                                </Label>
                                <Input
                                    type="text"
                                    name="travelWindow"
                                    value={field.state.value}
                                    onChange={e => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur} />
                            </div>
                        )}
                    </form.Field>
                
                </form>
                
                <DialogFooter className="sm:justify-start">
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
