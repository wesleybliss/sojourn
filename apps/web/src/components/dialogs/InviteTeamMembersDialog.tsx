// noinspection ShadcnComponentComposition

import { useWireState, useWireValue } from '@forminator/react-wire'
import { CirclePlus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useInviteTeamMembersForm, { InviteTeamMembersForm } from '@/hooks/forms/inviteTeamMembersForm'
import { useInviteTeamMembersMutation } from '@/lib/queries/teams'
import { useRouter } from '@/lib/router'
import * as store from '@/store'

const InviteTeamMembersDialog = () => {
    
    const router = useRouter()
    
    const currentTeamId = useWireValue(store.currentTeamId)
    const [inviteTeamId, setInviteTeamId] = useWireState(store.inviteTeamMemberDialogTeamId)
    
    const [isInvitingMembers, setIsInvitingMembers] = useState(false)
    
    const inviteTeamMembersMutation = useInviteTeamMembersMutation()
    
    const inviteTeamMembers = useCallback(async (value: InviteTeamMembersForm) => {
        
        setIsInvitingMembers(true)
        
        try {
            
            if (!currentTeamId)
                throw new Error('No team selected')
            
            await inviteTeamMembersMutation.mutateAsync({
                ...value,
                teamId: currentTeamId,
            })
            
        } catch (e) {
            
            console.error('Error inviting members:', e)
            toast.error('Failed to invite members. Please try again.')
            
        }
        
        setIsInvitingMembers(false)
        setInviteTeamId(null)
        
    }, [inviteTeamMembersMutation, router, setInviteTeamId])
    
    const form = useInviteTeamMembersForm(inviteTeamMembers)
    
    const onCancel = () => setInviteTeamId(null)
    
    return (
        
        <Dialog
            open={!!inviteTeamId}
            onOpenChange={(open: boolean) => {
                if (open) return
                form.reset()
                onCancel()
            }}>
            
            <DialogContent>
                
                <DialogHeader>
                    <DialogTitle>
                        Invite Team Members
                    </DialogTitle>
                    <DialogDescription>
                        Invite members to join your team.
                    </DialogDescription>
                </DialogHeader>
                
                <form className="block space-y-6" onSubmit={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}>
                    
                    <form.Field name="inviteeEmails" mode="array">
                        {field => (
                            field.state.value.map((_, index) => (
                                <form.Field key={`inviteeEmails[${index}]`} name={`inviteeEmails[${index}]`}>
                                    {subfield => (
                                        <div className="space-y-2">
                                            <Label htmlFor="name">
                                                Email
                                            </Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    className="flex-1"
                                                    type="text"
                                                    name="name"
                                                    value={subfield.state.value}
                                                    onChange={e =>
                                                        subfield.handleChange(e.target.value)}
                                                    onBlur={subfield.handleBlur} />
                                                {index === field.state.value.length - 1 && (
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => field.pushValue('')}>
                                                                <CirclePlus />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="right">
                                                            Add another email
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </form.Field>
                            ))
                        )}
                    </form.Field>
                
                </form>
                
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isInvitingMembers}
                        onClick={form.handleSubmit}>
                        {isInvitingMembers && <Spinner data-icon="inline-start" />}
                        Invite Members
                    </Button>
                </DialogFooter>
            
            </DialogContent>
        
        </Dialog>
        
    )
    
}

export default InviteTeamMembersDialog
