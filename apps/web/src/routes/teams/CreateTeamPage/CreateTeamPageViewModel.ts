import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { toast } from 'sonner'

import useCreateTeamForm, { CreateTeamForm, UseCreateTeamFormReturn } from '@/hooks/forms/useCreateTeamForm'
import { useCreateTeam } from '@/lib/queries/teams'

export type TCreateTeamPageViewModel = {
    // State
    isCreatingTeam: boolean
    setIsCreatingTeam: Dispatch<SetStateAction<boolean>>
    
    // Methods
    handleCreateTeam: (value: CreateTeamForm) => Promise<void>
    
    // Hooks
    form: UseCreateTeamFormReturn
}

const CreateTeamPageViewModel = (): TCreateTeamPageViewModel => {
    
    const [isCreatingTeam, setIsCreatingTeam] = useState(false)
    
    const createTeamMutation = useCreateTeam()
    
    const handleCreateTeam = useCallback(async (value: CreateTeamForm) => {
        
        try {
            
            const res = await createTeamMutation.mutateAsync(value)
            
            console.log('@handlecreateteam', res)
            
        } catch (e) {
            
            console.error('handleCreateTeam', e)
            toast.error('Failed to create team')
            
        }
        
    }, [createTeamMutation])
    
    const form = useCreateTeamForm(handleCreateTeam)
    
    return {
        
        // State
        isCreatingTeam,
        setIsCreatingTeam,
        
        // Methods
        handleCreateTeam,
        
        // Hooks
        form,
        
    }
    
}

export default CreateTeamPageViewModel
