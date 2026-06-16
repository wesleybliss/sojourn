// noinspection ShadcnComponentComposition

import { useWireState, useWireValue } from '@forminator/react-wire'
import { useCallback, useMemo, useState } from 'react'
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
import useUpdateTeamForm, { UpdateTeamForm, updateTeamFormSchema } from '@/hooks/forms/useUpdateTeamForm'
import { useUpdateTeam } from '@/lib/queries/teams'
import * as store from '@/store'

const UpdateTeamDialog = () => {
    
    const teams = useWireValue(store.teams)
    const [updateTeamDialogId, setUpdateTeamDialogId] = useWireState(store.updateTeamDialogId)
    
    const [isUpdatingTeam, setIsUpdatingTeam] = useState(false)
    
    const updateTeamMutation = useUpdateTeam()
    
    const team = useMemo(() => (
        teams?.find(it => it.id === updateTeamDialogId) ?? null
    ), [teams, updateTeamDialogId])
    
    const updateTeam = useCallback(async (value: UpdateTeamForm) => {
        
        if (!team)
            return console.warn('updateTeam: No team selected for update.')
        
        setIsUpdatingTeam(true)
        
        try {
            
            await updateTeamMutation.mutateAsync({
                id: team.id,
                ...value,
            })
            
        } catch (e) {
            
            console.error('Error updating team:', e)
            toast.error('Failed to update team. Please try again.')
            
        }
        
        setIsUpdatingTeam(false)
        setUpdateTeamDialogId(null)
        
    }, [updateTeamMutation, setUpdateTeamDialogId])
    
    const form = useUpdateTeamForm(team?.name ?? '', updateTeam)
    
    const onCancel = () => setUpdateTeamDialogId(null)
    
    return (
        
        <Dialog
            open={!!updateTeamDialogId}
            onOpenChange={(open: boolean) => !open && onCancel()}>
            
            <DialogContent>
                
                <DialogHeader>
                    <DialogTitle>
                        Update Team
                    </DialogTitle>
                    <DialogDescription>
                        Modify your existing team.
                    </DialogDescription>
                </DialogHeader>
                
                <form className="block space-y-6" onSubmit={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}>
                    
                    <form.Field
                        name="name"
                        validators={{
                            onChange: updateTeamFormSchema.shape.name,
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
                    
                    <form.Field
                        name="description"
                        validators={{
                            onChange: updateTeamFormSchema.shape.description,
                        }}>
                        {field => (
                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Description
                                </Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={field.state.value}
                                    onChange={e => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur} />
                            </div>
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
                        disabled={isUpdatingTeam}
                        onClick={form.handleSubmit}>
                        {isUpdatingTeam && <Spinner data-icon="inline-start" />}
                        Update Team
                    </Button>
                </DialogFooter>
            
            </DialogContent>
        
        </Dialog>
        
    )
    
}

export default UpdateTeamDialog
