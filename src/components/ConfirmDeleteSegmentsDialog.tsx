import { ComponentProps, useMemo, useState } from 'react'
import { cn, noop } from '@/utils'
import ConfirmDialog from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { MapPinX } from 'lucide-react'

interface ConfirmDeleteSegmentsDialogProps extends ComponentProps<'button'> {
    className?: string
    isMultiple?: boolean
    onConfirm: () => void
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
            onConfirm={onConfirm} />
        
    )
    
}

export default ConfirmDeleteSegmentsDialog
