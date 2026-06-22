import { Place, placeNoteInsertSchema } from '@repo/shared/types'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

const placeNoteFormSchema = placeNoteInsertSchema.extend({
    placeId: placeNoteInsertSchema.shape.placeId.optional(),
})

export const updatePlaceFormSchema = z.object({
    name: z.string()
        .min(3, 'Name must be at least 3 characters')
        .max(20, 'Name must be at most 32 characters'),
    coverImageUrl: z.string().optional(),
    focus: z.string().optional(),
    notes: z.array(placeNoteFormSchema).optional(),
})

export type UpdatePlaceForm = z.infer<typeof updatePlaceFormSchema>

const useUpdatePlaceForm = (
    currentPlace: Place | null,
    onSubmit: (value: UpdatePlaceForm) => Promise<void>,
) => {
    
    return useForm({
        defaultValues: {
            name: currentPlace?.name,
            coverImageUrl: currentPlace?.coverImageUrl ?? '',
            focus: currentPlace?.focus ?? '',
            notes: currentPlace?.notes ?? [],
        } as UpdatePlaceForm,
        validators: {
            onChange: updatePlaceFormSchema,
        },
        onSubmit: async ({ value }) => onSubmit(value),
    })
    
}

export default useUpdatePlaceForm
