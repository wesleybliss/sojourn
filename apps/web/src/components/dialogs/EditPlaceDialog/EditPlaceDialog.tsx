import AddNoteButton from '@/components/dialogs/EditPlaceDialog/AddNoteButton'
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

import useEditPlaceDialogViewModel from './EditPlaceDialogViewModel'

const EditPlaceDialog = () => {
    
    const vm = useEditPlaceDialogViewModel()
    
    return (
        
        <Dialog
            open={vm.updatePlaceDialogPlace !== null}
            onOpenChange={(open: boolean) => !open && vm.onCancel()}>
            
            <DialogContent className="sm:max-w-9/12 2xl:max-w-6/12 max-h-[80vh] overflow-hidden">
                
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
                        vm.form.handleSubmit()
                    }}>
                    
                    <div className="col-span-5 space-y-6">
                        <PlaceDetailsFields form={vm.form} />
                    </div>
                    
                    <div className="col-span-1 flex justify-center">
                        <div className="w-px bg-muted h-full" />
                    </div>
                    
                    <div className="col-span-6 max-h-[45vh] overflow-y-auto pr-4 pb-4">
                        <vm.form.Field name="notes" mode="array">
                            {field => (
                                !field.state.value?.length ? (
                                    
                                    <div className="flex flex-col justify-center h-full text-center">
                                        <p>Create a note to get started.</p>
                                        <div className="flex justify-center mt-4">
                                            <AddNoteButton field={field} />
                                        </div>
                                    </div>
                                    
                                ) : (<>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <Label>Notes</Label>
                                        </div>
                                        {(field.state.value ?? []).length > 0 && (
                                            <PlaceNoteField
                                                form={vm.form}
                                                field={field} />
                                        )}
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <AddNoteButton field={field} />
                                    </div>
                                
                                </>)
                            )}
                        </vm.form.Field>
                    </div>
                
                </form>
                
                <DialogFooter className="mt-3 justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={vm.onCancel}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        className={vm.isUpdatingPlace ? 'opacity-50 cursor-not-allowed' : ''}
                        disabled={vm.isUpdatingPlace}
                        onClick={vm.form.handleSubmit}>
                        {vm.isUpdatingPlace && <Spinner data-icon="inline-start" />}
                        Update Place
                    </Button>
                </DialogFooter>
            
            </DialogContent>
        
        </Dialog>
        
    )
    
}

export default EditPlaceDialog
