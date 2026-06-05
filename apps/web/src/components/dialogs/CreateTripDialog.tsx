// noinspection ShadcnComponentComposition

import { useWireState } from '@forminator/react-wire'
import { useState } from 'react'
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
import useCreateTripForm, { CreateTripForm, createTripFormSchema } from '@/hooks/forms/useCreateTripForm'
import { useCreateTripMutation } from '@/lib/queries/trip'
import { useRouter } from '@/lib/router'
import * as store from '@/store'

const CreateTripDialog = () => {
    
    const router = useRouter()
    
    const [createTripDialogOpen, setCreateTripDialogOpen] = useWireState(store.createTripDialogOpen)
    
    const [isCreatingTrip, setIsCreatingTrip] = useState(false)
    
    const createTripMutation = useCreateTripMutation()
    
    const createNewTrip = async (value: CreateTripForm) => {
        
        setIsCreatingTrip(true)
        
        try {
            
            const result = await createTripMutation.mutateAsync(value)
            const newTrip = result.data
            console.log('wtf', { newTrip })
            if (newTrip)
                router.push(`/trips/${newTrip.id}`)
            
        } catch (e) {
            
            console.error('Error creating trip:', e)
            toast.error('Failed to create trip. Please try again.')
            
        }
        
        setIsCreatingTrip(false)
        setCreateTripDialogOpen(false)
        
    }
    
    const form = useCreateTripForm(createNewTrip)
    
    const onCancel = () => setCreateTripDialogOpen(false)
    
    return (
        
        <Dialog
            open={createTripDialogOpen}
            onOpenChange={(open: boolean) => !open && onCancel()}>
            
            <DialogContent>
                
                <DialogHeader>
                    <DialogTitle>
                        Create Trip
                    </DialogTitle>
                    <DialogDescription>
                        Create a new trip.
                    </DialogDescription>
                </DialogHeader>
                
                <form className="block space-y-6" onSubmit={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}>
                    
                    <form.Field
                        name="name"
                        validators={{
                            onChange: createTripFormSchema.shape.name,
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
                    
                    <form.Field
                        name="description"
                        validators={{
                            onChange: createTripFormSchema.shape.description,
                        }}>
                        {field => (
                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Description
                                </Label>
                                <Input
                                    type="text"
                                    name="description"
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
                        disabled={isCreatingTrip}
                        onClick={form.handleSubmit}>
                        {isCreatingTrip && <Spinner data-icon="inline-start" />}
                        Create Trip
                    </Button>
                </DialogFooter>
            
            </DialogContent>
        
        </Dialog>
        
    )
    
}

export default CreateTripDialog
