import { AnyFieldApi } from '@tanstack/react-form'
import { CirclePlus } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export interface AddNoteButtonProps {
    field: AnyFieldApi
}

const AddNoteButton = memo(({
    field,
}: AddNoteButtonProps) => {
    
    return (
        
        <Tooltip>
            
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => field.pushValue({ name: '', content: '' })}>
                    <CirclePlus data-icon="inline-start" />
                    Add Note
                </Button>
            </TooltipTrigger>
            
            <TooltipContent>
                Add a new note
            </TooltipContent>
        
        </Tooltip>
        
    )
    
})

export default AddNoteButton
