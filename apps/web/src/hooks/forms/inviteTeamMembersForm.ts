import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

export const inviteTeamMembersFormSchema = z.object({
    inviteeEmails: z.array(z.string().trim().email()).min(1),
})

export type InviteTeamMembersForm = z.infer<typeof inviteTeamMembersFormSchema>

const useInviteTeamMembersForm = (
    onSubmit: (value: InviteTeamMembersForm) => Promise<void>,
) => {
    
    return useForm({
        defaultValues: {
            inviteeEmails: [''],
        } as InviteTeamMembersForm,
        validators: {
            onChange: inviteTeamMembersFormSchema,
        },
        onSubmit: async ({ value }) => onSubmit(value),
    })
    
}

export default useInviteTeamMembersForm
