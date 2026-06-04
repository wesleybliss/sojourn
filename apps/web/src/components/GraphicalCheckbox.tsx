import { Check, ListChecks, Minus } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface GraphicalCheckboxProps {
    className?: string
    iconClassName?: string
    checked: boolean
    indeterminate: boolean
    onChange: (checked: boolean) => void
    variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined
    size?: 'default' | 'icon' | 'xs' | 'sm' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon-lg' | null | undefined
    tooltip?: string
    tooltipProps?: Record<string, unknown>
}

const GraphicalCheckbox = memo(({
    className,
    iconClassName = 'size-4',
    checked,
    indeterminate,
    onChange,
    variant = 'outline',
    size = 'icon',
    tooltip,
    tooltipProps,
}: GraphicalCheckboxProps) => {
    
    const checkbox = (
        
        <Button
            className={className}
            variant={variant}
            size={size}
            onClick={() => onChange(!checked)}>
            
            {checked ? (
                <ListChecks className={iconClassName} />
            ) : indeterminate ? (
                <Minus className={iconClassName} />
            ) : (
                <Check className={iconClassName} />
            )}
        
        </Button>
        
    )
    
    if (tooltip) return (
        
        <Tooltip>
            <TooltipTrigger asChild>
                {checkbox}
            </TooltipTrigger>
            <TooltipContent {...tooltipProps || {}}>
                {tooltip}
            </TooltipContent>
        </Tooltip>
        
    )
    
    return checkbox
    
})

export default GraphicalCheckbox
