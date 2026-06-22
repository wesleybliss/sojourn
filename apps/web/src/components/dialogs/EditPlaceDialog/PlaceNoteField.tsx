import { AnyFieldApi } from '@tanstack/react-form'
import { Trash2 } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useUpdatePlaceForm, { placeNoteFormSchema } from '@/hooks/forms/useUpdatePlaceForm'

export interface PlaceNoteFieldProps {
    form: ReturnType<typeof useUpdatePlaceForm>
    field: AnyFieldApi
}

const PlaceNoteField = memo(({
    form,
    field,
}: PlaceNoteFieldProps) => {
    
    return (
        
        <div className="space-y-3">
            
            {(field.state.value ?? []).map((_: unknown, index: number) => (
                
                <div
                    key={`notes[${index}]`}
                    className="space-y-2 rounded-md border bg-muted/30 p-3">
                    <div className="flex items-end gap-2">
                        
                        <form.Field
                            name={`notes[${index}].name`}
                            validators={{
                                onChange: placeNoteFormSchema.shape.name,
                            }}>
                            {subfield => (
                                <div className="flex-1 space-y-1">
                                    <Input
                                        id={`notes[${index}].name`}
                                        type="text"
                                        placeholder="Note title"
                                        value={subfield.state.value ?? ''}
                                        onChange={e => subfield.handleChange(e.target.value)}
                                        onBlur={subfield.handleBlur} />
                                </div>
                            )}
                        </form.Field>
                        
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => field.removeValue(index)}>
                                    <Trash2 />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Remove note
                            </TooltipContent>
                        </Tooltip>
                    
                    </div>
                    
                    <form.Field
                        name={`notes[${index}].content`}
                        validators={{
                            onChange: placeNoteFormSchema.shape.content,
                        }}>
                        {subfield => (
                            <div className="space-y-1">
                                <Textarea
                                    id={`notes[${index}].content`}
                                    className="h-40"
                                    placeholder="Note details..."
                                    value={subfield.state.value ?? ''}
                                    onChange={e => subfield.handleChange(e.target.value)}
                                    onBlur={subfield.handleBlur} />
                            </div>
                        )}
                    </form.Field>
                
                </div>
                
            ))}
        
        </div>
        
    )
    
})

export default PlaceNoteField
