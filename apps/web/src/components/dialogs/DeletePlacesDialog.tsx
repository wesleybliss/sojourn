import { useWireState } from '@forminator/react-wire'

import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import * as store from '@/store'

export interface DeletePlacesDialogProps {
    onConfirm: () => Promise<void>
}

const DeletePlacesDialog = ({
    onConfirm,
}: DeletePlacesDialogProps) => {
    
    const [deletePlacesDialogOpen, setDeletePlacesDialogOpen] = useWireState(store.deletePlacesDialogOpen)
    
    return (
        
        <ConfirmDialog
            open={deletePlacesDialogOpen}
            title="Delete Places"
            message="Are you sure you want to delete these places?"
            cancelLabel="Cancel"
            onCancel={() => setDeletePlacesDialogOpen(false)}
            confirmLabel="Delete Places"
            onConfirm={onConfirm} />
        
    )
    
}

export default DeletePlacesDialog
