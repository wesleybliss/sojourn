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
    open = false,
    trigger = null,
    title,
    message,
    cancelLabel = 'Close',
    onCancel = null,
    confirmLabel,
    confirmProps = {},
    onConfirm,
    ...props
} = {}) => {
    
    const dialogProps = {}
    
    if (open === true || open === false)
        dialogProps.open = open
    
    return (
        
        <Dialog {...dialogProps}>
            
            {trigger && (
                <DialogTrigger asChild>
                    {typeof trigger === 'string'
                        ? <Button variant="outline" {...props}>{trigger}</Button>
                        : trigger}
                </DialogTrigger>
            )}
            
            <DialogContent>
                
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
                
                <DialogFooter className="sm:justify-start">
                    {onCancel && (
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={onCancel}>
                                {cancelLabel || 'Cancel'}
                            </Button>
                        </DialogClose>
                    )}
                    <Button onClick={onConfirm} {...confirmProps}>
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            
            </DialogContent>
        
        </Dialog>
        
    )
    
}

export default ConfirmDialog
