import { z } from 'zod'

import LoadingSpinner from '@/components/LoadingSpinner'
import useTypedParams from '@/hooks/useTypedParams'
import { useTeamQuery } from '@/lib/queries/teams'

const paramsSchema = z.object({
    teamId: z.coerce.number(),
})

const TeamPage = () => {
    
    const { teamId } = useTypedParams(paramsSchema)
    
    const {
        data: team,
        isError,
        isPending,
        error,
    } = useTeamQuery(teamId)
    
    if (isError) return (
        <div>
            <p>Error loading team</p>
            <pre><code>{JSON.stringify(error, null, 4)}</code></pre>
        </div>
    )
    
    if (isPending) return (
        <LoadingSpinner />
    )
    
    return (
        
        <div>
            
            <h1>Team</h1>
            
            {error && <div><pre><code>{JSON.stringify(error, null, 4)}</code></pre></div>}
            
            <div><pre><code>{JSON.stringify(team, null, 4)}</code></pre></div>
        
        </div>
        
    )
    
}

export default TeamPage
