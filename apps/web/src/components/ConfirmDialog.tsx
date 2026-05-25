import { JSX, MouseEventHandler, ReactNode } from 'react'

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

interface ConfirmDialogProps {
    open: boolean | null | undefined
    trigger?: ReactNode | JSX.Element | null
    title: string
    message: string
    cancelLabel: string
    onCancel?: MouseEventHandler<HTMLButtonElement> | null
    confirmLabel: string
    confirmProps?: Record<string, unknown>
    onConfirm: MouseEventHandler<HTMLButtonElement>
}

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
}: ConfirmDialogProps) => {
    
    return (
        
        <Dialog open={open === true}>
            
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
