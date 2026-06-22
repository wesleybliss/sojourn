import { Place } from '@repo/shared/types'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

export const updatePlaceFormSchema = z.object({
    name: z.string()
        .min(3, 'Name must be at least 3 characters')
        .max(20, 'Name must be at most 32 characters'),
    coverImageUrl: z.string().optional(),
    focus: z.string().optional(),
    quickTip: z.string().optional(),
    personalNotes: z.string().optional(),
    region: z.string().optional(),
    travelWindow: z.string().optional(),
})

export type UpdatePlaceForm = z.infer<typeof updatePlaceFormSchema>

const useUpdatePlaceForm = (
    currentPlace: Place | null,
    onSubmit: (value: UpdatePlaceForm) => Promise<void>,
) => {
    
    return useForm({
        defaultValues: {
            name: currentPlace?.name,
            coverImageUrl: currentPlace?.coverImageUrl,
            focus: currentPlace?.focus,
            quickTip: currentPlace?.quickTip,
            personalNotes: currentPlace?.personalNotes,
            region: currentPlace?.region,
            travelWindow: currentPlace?.travelWindow,
        } as UpdatePlaceForm,
        validators: {
            onChange: updatePlaceFormSchema,
        },
        onSubmit: async ({ value }) => onSubmit(value),
    })
    
}

export default useUpdatePlaceForm
