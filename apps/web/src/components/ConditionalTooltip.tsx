import { ReactNode } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export interface ConditionalTooltipProps {
    enabled: boolean
    content: string | ReactNode
    children: ReactNode
}

const ConditionalTooltip = ({
    enabled,
    content,
    children,
}: ConditionalTooltipProps) => {
    
    if (enabled) return (
        
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side="right">
                {content}
            </TooltipContent>
        </Tooltip>
        
    )
    
    return children
    
}

export default ConditionalTooltip
