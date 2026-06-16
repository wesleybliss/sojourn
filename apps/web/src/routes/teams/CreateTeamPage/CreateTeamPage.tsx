import { Team } from '@repo/shared/types'
import { memo } from 'react'

import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { createTeamFormSchema } from '@/hooks/forms/useCreateTeamForm'
import AppLayout from '@/layouts/AppLayout'
import { useTeamsQuery } from '@/lib/queries/teams'
import { cn } from '@/utils'

import useCreateTeamPageViewModel from './CreateTeamPageViewModel'

export interface CreateTeamPageProps {
    teams: Team[]
}

const CreateTeamPage = ({
    teams,
}: CreateTeamPageProps) => {
    
    const vm = useCreateTeamPageViewModel()
    
    return (
        
        <div className="w-full min-h-screen bg-background">
            
            {!teams?.length && (
                <header className="flex justify-end items-center gap-3 p-3">
                    <ThemeSwitcher />
                </header>
            )}
            
            <div className={cn('flex flex-col items-center justify-center', {
                'h-[calc(100vh-8rem)]': teams?.length,
                'h-[calc(100vh-12rem)]': !teams?.length,
            })}>
                
                {!teams?.length && (
                    <div className="text-center mb-12">
                        You are not a member of any team yet.
                        <br />
                        Create one to get started.
                    </div>
                )}
                
                <form
                    className="block w-1/3 mx-auto space-y-6 p-3 border rounded-xl bg-surface-container"
                    onSubmit={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        vm.form.handleSubmit()
                    }}>
                    
                    <vm.form.Field
                        name="name"
                        validators={{
                            onChange: createTeamFormSchema.shape.name,
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
                    </vm.form.Field>
                    
                    <Button
                        type="submit"
                        disabled={vm.isCreatingTeam}
                        onClick={vm.form.handleSubmit}>
                        {vm.isCreatingTeam && <Spinner data-icon="inline-start" />}
                        Create Team
                    </Button>
                
                </form>
            
            </div>
        
        </div>
        
    )
    
}

const CreateTeamPageWrap = memo(() => {
    
    const { data: teams, isError, error, isPending  } = useTeamsQuery()
    
    if (isPending) return null
    
    if (isError) {
        console.error('CreateTeamPageWrap', error)
        return null
    }
    
    return teams?.length ? (
        <AppLayout>
            <CreateTeamPage teams={teams || []} />
        </AppLayout>
    ) : <CreateTeamPage teams={teams || []} />
    
})

export default CreateTeamPageWrap
