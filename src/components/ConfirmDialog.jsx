import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

const ConfirmDialog = ({
    trigger,
    title,
    message,
    cancelLabel = 'Close',
    onCancel = null,
    confirmLabel,
    onConfirm,
    ...props
} = {}) => (
    
    <Dialog>
        
        <DialogTrigger asChild>
            {typeof trigger === 'string'
                ? <Button variant="outline" {...props}>{trigger}</Button>
                : trigger}
        </DialogTrigger>
        
        <DialogContent>
            
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {message}
                </DialogDescription>
            </DialogHeader>
            
            <DialogFooter className="sm:justify-start">
                {cancelLabel && onCancel && (
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            {cancelLabel}
                        </Button>
                    </DialogClose>
                )}
                <Button onClick={onConfirm}>
                    {confirmLabel}
                </Button>
            </DialogFooter>
        
        </DialogContent>
    
    </Dialog>
    
)

export default ConfirmDialog
