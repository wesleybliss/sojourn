import { useWireState } from '@forminator/react-wire'

import ConfirmDialog from '@/components/ConfirmDialog'
import * as store from '@/store'

export interface DeleteTripDialogProps {
    onConfirm: () => Promise<void>
}

const DeleteTripDialog = ({
    onConfirm,
}: DeleteTripDialogProps) => {
    
    const [deleteTripDialogId, setDeleteTripDialogId] = useWireState(store.deleteTripDialogId)
    
    return (
        
        <ConfirmDialog
            open={deleteTripDialogId !== null}
            title="Delete Trip"
            message="Are you sure you want to delete this trip?"
            cancelLabel="Cancel"
            onCancel={() => setDeleteTripDialogId(null)}
            confirmLabel="Delete Trip"
            onConfirm={onConfirm} />
        
    )
    
}

export default DeleteTripDialog
