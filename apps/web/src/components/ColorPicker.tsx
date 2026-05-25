import { cn } from '@repo/shared/utils'
import { useMemo,useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ColorPickerProps {
    sizeClassName?: string
    steps?: number
    staticColors?: string[] | null
    value?: string
    onChange?: (value: string) => void
}

const generateHueColors = (steps: number) => Array(steps).fill(0).map((_, i) => {
    
    const hue = (i / steps) * 360
    
    return `hsl(${hue}, 100%, 50%)`
    
})

const ColorPicker = ({
    sizeClassName = 'size-8',
    steps = 36,
    staticColors = null,
    value,
    onChange,
}: ColorPickerProps) => {
    
    const [open, setOpen] = useState(false)
    
    const colors = useMemo(() => staticColors || generateHueColors(steps), [steps])
    
    return (
        
        <Popover open={open} onOpenChange={setOpen}>
            
            <PopoverTrigger
                className={cn(sizeClassName, 'rounded-md', staticColors ? value : '')}
                style={staticColors ? {} : { backgroundColor: value }} />
            
            <PopoverContent className="w-60 h-40 p-2">
                
                <div className="grid grid-cols-6 gap-1">
                    {colors.map(it => (
                        <button
                            key={it}
                            className={cn(
                                'size-8 rounded-md ring-2 hover:ring-gray-300',
                                it === value ? 'ring-black' : 'ring-gray-200',
                                staticColors ? it : '',
                            )}
                            style={staticColors ? {} : { backgroundColor: it }}
                            onClick={() => {
                                onChange?.(it)
                                setOpen(false)
                            }} />
                    ))}
                </div>
            
            </PopoverContent>
        
        </Popover>
        
    )
    
}

export default ColorPicker
