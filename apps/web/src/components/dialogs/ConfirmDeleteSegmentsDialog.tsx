import { cn, noop } from '@repo/shared/utils'
import { MapPinX } from 'lucide-react'
import { ComponentProps, useMemo, useState } from 'react'

import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import { Button } from '@/components/ui/button'

interface ConfirmDeleteSegmentsDialogProps extends ComponentProps<'button'> {
    className?: string
    isMultiple?: boolean
    onConfirm: () => Promise<void>
}

const ConfirmDeleteSegmentsDialog = ({
    className,
    isMultiple,
    onConfirm,
    ...props
}: ConfirmDeleteSegmentsDialogProps) => {
    
    const [open, setOpen] = useState(false)
    
    const title = useMemo(() => {
        
        const text = 'Delete Segment'
        
        return isMultiple ? `${text}s` : text
        
    }, [isMultiple])
    
    const message = useMemo(() => {
        
        const text = isMultiple ? 'these segments?' : 'this segment'
        
        return `Are you sure you want to delete ${text}?`
        
    }, [isMultiple])
    
    return (
        
        <ConfirmDialog
            open={open}
            trigger={
                <Button
                    className={cn(
                        'text-destructive hover:bg-destructive/60 ',
                        'hover:text-primary-foreground',
                        className)}
                    variant="ghost"
                    onClick={() => setOpen(!open)}
                    {...props}>
                    <MapPinX />
                </Button>
            }
            title={title}
            message={message}
            cancelLabel="Cancel"
            onCancel={noop}
            confirmLabel="Delete"
            onConfirm={() => onConfirm().finally(() => setOpen(false))} />
        
    )
    
}

export default ConfirmDeleteSegmentsDialog
