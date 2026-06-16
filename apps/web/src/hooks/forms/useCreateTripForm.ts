import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

export const createTripFormSchema = z.object({
    teamId: z.number().optional(),
    name: z.string()
        .min(3, 'Name must be at least 3 characters')
        .max(20, 'Name must be at most 32 characters'),
    description: z.string().optional(),
})

export type CreateTripForm = z.infer<typeof createTripFormSchema>

const useCreateTripForm = (
    onSubmit: (value: CreateTripForm) => Promise<void>,
) => {
    
    return useForm({
        defaultValues: {
            name: 'New Trip',
            description: '',
        } as CreateTripForm,
        validators: {
            onChange: createTripFormSchema,
        },
        onSubmit: async ({ value }) => onSubmit(value),
    })
    
}

export default useCreateTripForm
