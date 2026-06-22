import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useUpdatePlaceForm, { updatePlaceFormSchema } from '@/hooks/forms/useUpdatePlaceForm'

export interface PlaceDetailsFieldsProps {
    form: ReturnType<typeof useUpdatePlaceForm>
}

const PlaceDetailsFields = ({
    form,
}: PlaceDetailsFieldsProps) => {
    
    return (<>
        
        <div className="space-y-0">
            <form.Field
                name="name"
                validators={{
                    onChange: updatePlaceFormSchema.shape.name,
                }}>
                {field => (
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            value={field.state.value}
                            onChange={e => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur} />
                    </div>
                )}
            </form.Field>
            <p className="p-2 text-muted-foreground text-sm">
                <i>Note: changing the default place name is not recommended.</i>
            </p>
        </div>
        
        <form.Field
            name="coverImageUrl"
            validators={{
                onChange: updatePlaceFormSchema.shape.coverImageUrl,
            }}>
            {field => (
                <div className="space-y-2">
                    <Label htmlFor="coverImageUrl">
                        Cover Image
                    </Label>
                    <Input
                        type="text"
                        name="coverImageUrl"
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        disabled />
                </div>
            )}
        </form.Field>
        
        <form.Field
            name="focus"
            validators={{
                onChange: updatePlaceFormSchema.shape.focus,
            }}>
            {field => (
                <div className="space-y-2">
                    <Label htmlFor="focus">
                        Focus
                    </Label>
                    <Textarea
                        className="h-40"
                        name="focus"
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur} />
                </div>
            )}
        </form.Field>
    
    </>)
    
}

export default PlaceDetailsFields
