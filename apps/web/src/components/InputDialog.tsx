import { useEffect,useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InputDialogProps {
    className?: string
    open?: boolean
    setOpen?: (open: boolean) => void
    title?: string
    description?: string
    inputFieldLabel?: string
    initialValue?: string
    onSubmit?: (value: string) => Promise<void>
}

const InputDialog = ({
    className = '',
    open = false,
    setOpen = () => {},
    title = '',
    description = '',
    inputFieldLabel = '',
    initialValue = '',
    onSubmit = async (value: string) => {},
}: InputDialogProps) => {
    
    const [value, setValue] = useState('')
    
    useEffect(() => {
        
        if (!open)
            setValue('')
        else if (initialValue?.length && !value.length)
            setValue(initialValue)
        
    }, [open, initialValue, value])
    
    return (
        
        <Dialog open={open}>
            
            <DialogContent className={`sm:max-w-106.25 ${className}`}>
                
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="inputDialogField">{inputFieldLabel}</Label>
                        <Input
                            id="inputDialogField"
                            name="inputDialogField"
                            value={value}
                            onChange={e => setValue(e.target.value)} />
                    </div>
                </div>
                
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={async () => {
                        
                        if (!value?.trim()) return
                        
                        await onSubmit(value)
                        
                        setOpen(false)
                        
                    }}>
                        Save changes
                    </Button>
                </DialogFooter>
            
            </DialogContent>
        
        </Dialog>
        
    )
    
}

export default InputDialog
