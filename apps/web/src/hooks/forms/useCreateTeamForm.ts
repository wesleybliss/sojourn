import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

export const createTeamFormSchema = z.object({
    name: z.string()
        .min(3, 'Name must be at least 3 characters')
        .max(32, 'Name must be at most 32 characters'),
    description: z.string().optional(),
})

export type CreateTeamForm = z.infer<typeof createTeamFormSchema>

const useCreateTeamForm = (
    onSubmit: (value: CreateTeamForm) => Promise<void>,
) => {
    
    return useForm({
        defaultValues: {
            name: 'New Team',
            description: '',
        } as CreateTeamForm,
        validators: {
            onChange: createTeamFormSchema,
        },
        onSubmit: async ({ value }) => onSubmit(value),
    })
    
}

export type UseCreateTeamFormReturn = ReturnType<typeof useCreateTeamForm>

export default useCreateTeamForm
