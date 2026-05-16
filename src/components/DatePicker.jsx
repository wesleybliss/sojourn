import { useState, useMemo } from 'react'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import dayjs from 'dayjs'

const DatePicker = ({
    buttonClassName = '',
    buttonVariant = 'outline',
    date,
    onSelect,
} = {}) => {
    
    const [open, setOpen] = useState(false)
    
    const value = useMemo(() => date ? dayjs(date) : undefined, [date])
    const month = useMemo(() => value ? new Date(value.year(), value.month()) : undefined, [value])
    
    return (
        
        <Popover open={open} onOpenChange={setOpen}>
            
            <PopoverTrigger asChild>
                <Button
                    variant={buttonVariant}
                    className={cn(
                        'justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                        buttonClassName,
                    )}>
                    <CalendarIcon />
                    {date ? dayjs(date).format( 'MMM DD, YYYY') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    defaultMonth={month}
                    selected={value ? value.toDate() : undefined}
                    onSelect={(...args) => {
                        onSelect(...args)
                        setOpen(false)
                    }}
                    initialFocus />
            </PopoverContent>
        
        </Popover>
        
    )
    
}

export default DatePicker
