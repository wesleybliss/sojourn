import { useWireState } from '@forminator/react-wire'

import InputDialog from '@/components/InputDialog'
import * as store from '@/store'

export interface CreatePlaceDialogProps {
    onConfirm: (name: string) => Promise<void>
}

const CreatePlaceDialog = ({
    onConfirm,
}: CreatePlaceDialogProps) => {
    
    const [createPlaceDialogOpen, setCreatePlaceDialogOpen] = useWireState(store.createPlaceDialogOpen)
    
    return (
        
        <InputDialog
            description="Create a saved place card with a generated cover image and planning notes scaffold."
            initialValue=""
            inputFieldLabel="Place name"
            onSubmit={onConfirm}
            open={createPlaceDialogOpen}
            setOpen={setCreatePlaceDialogOpen}
            title="Create Place" />
        
    )
    
}

export default CreatePlaceDialog
