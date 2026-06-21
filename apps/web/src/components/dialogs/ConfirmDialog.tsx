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
import { Spinner } from '@/components/ui/spinner'

interface ConfirmDialogProps {
    open: boolean | null | undefined
    trigger?: ReactNode | JSX.Element | null
    title: string
    message?: string
    cancelLabel?: string | null
    onCancel?: (() => void) | MouseEventHandler<HTMLButtonElement> | null
    confirmLabel: string
    confirmProps?: Record<string, unknown>
    onConfirm: MouseEventHandler<HTMLButtonElement>
    isLoading?: boolean
    children?: ReactNode
}

const ConfirmDialog = ({
    open = false,
    trigger = null,
    title,
    message = undefined,
    cancelLabel = 'Close',
    onCancel = null,
    confirmLabel,
    confirmProps = {},
    onConfirm,
    isLoading = false,
    children,
    ...props
}: ConfirmDialogProps) => {
    
    if (message?.length && children)
        console.warn('ConfirmDialog: providing both message and children is an antipattern')
    
    return (
        
        <Dialog
            open={open === true}
            onOpenChange={(open: boolean) => !open && onCancel?.(null as never)}>
            
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
                    {message && (
                        <DialogDescription>
                            {message}
                        </DialogDescription>
                    )}
                </DialogHeader>
                
                {children && (
                    <DialogContent>
                        {children}
                    </DialogContent>
                )}
                
                <DialogFooter className="justify-end">
                    {cancelLabel !== null && onCancel && (
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={onCancel}>
                                {cancelLabel || 'Cancel'}
                            </Button>
                        </DialogClose>
                    )}
                    <Button
                        disabled={isLoading}
                        onClick={onConfirm} {...confirmProps}>
                        {isLoading && <Spinner data-icon="inline-start" />}
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            
            </DialogContent>
        
        </Dialog>
        
    )
    
}

export default ConfirmDialog
