import InputDialog from '@/components/dialogs/InputDialog'

export interface ShuffleCoverPhotoDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialValue?: string
    onConfirm: (value: string) => Promise<void>
}

const ShuffleCoverPhotoDialog = ({
    open,
    setOpen,
    initialValue = '',
    onConfirm,
}: ShuffleCoverPhotoDialogProps) => {
    
    return (
        
        <InputDialog
            description="Enter a topic to change the cover photo."
            initialValue={initialValue}
            inputFieldLabel="Photo topic"
            onSubmit={onConfirm}
            open={open}
            setOpen={setOpen}
            title="Shuffle Cover Photo" />
        
    )
    
}

export default ShuffleCoverPhotoDialog
