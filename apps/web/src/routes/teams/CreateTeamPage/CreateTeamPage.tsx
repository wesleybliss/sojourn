import ProtectedRoute from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { createTeamFormSchema } from '@/hooks/forms/useCreateTeamForm'

import useCreateTeamPageViewModel from './CreateTeamPageViewModel'

const CreateTeamPage = () => {
    
    const vm = useCreateTeamPageViewModel()
    
    return (
        
        <ProtectedRoute>
            
            <form className="block space-y-6" onSubmit={e => {
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
        
        </ProtectedRoute>
        
    )
    
}

export default CreateTeamPage
