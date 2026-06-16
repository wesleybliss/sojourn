import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

export const updateTeamFormSchema = z.object({
    name: z.string()
        .min(3, 'Name must be at least 3 characters')
        .max(20, 'Name must be at most 32 characters'),
    description: z.string().optional(),
})

export type UpdateTeamForm = z.infer<typeof updateTeamFormSchema>

const useUpdateTeamForm = (
    currentName: string,
    onSubmit: (value: UpdateTeamForm) => Promise<void>,
) => {
    
    return useForm({
        defaultValues: {
            name: currentName,
            description: '',
        } as UpdateTeamForm,
        validators: {
            onChange: updateTeamFormSchema,
        },
        onSubmit: async ({ value }) => onSubmit(value),
    })
    
}

export default useUpdateTeamForm
