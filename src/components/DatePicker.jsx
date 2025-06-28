import { useMemo } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
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
    
    const value = useMemo(() => date ? dayjs(date) : undefined, [date])
    const month = useMemo(() => value ? new Date(value.year(), value.month()) : undefined, [value])
    
    return (
        
        <Popover>
            
            <PopoverTrigger asChild>
                <Button
                    variant={buttonVariant}
                    className={cn(
                        'justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                        buttonClassName,
                    )}>
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    defaultMonth={month}
                    selected={value ? value.toDate() : undefined}
                    onSelect={(...args) => console.log('DatePicker#onSelect', args) || onSelect(...args)}
                    initialFocus />
            </PopoverContent>
        
        </Popover>
        
    )
    
}

export default DatePicker
