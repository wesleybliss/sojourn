import { z } from 'zod'

import useTypedParams from '@/hooks/useTypedParams'
import { useTeamQuery } from '@/lib/queries/teams'

const paramsSchema = z.object({
    teamId: z.coerce.number(),
})

const TeamPage = () => {
    
    const { teamId } = useTypedParams(paramsSchema)
    
    const {
        data: team,
        isLoading,
        error,
    } = useTeamQuery(teamId)
    
    return (
        
        <div>
            
            <h1>Team</h1>
            
            {isLoading && <p>Loading...</p>}
            
            {error && <div><pre><code>{JSON.stringify(error, null, 4)}</code></pre></div>}
            
            <div><pre><code>{JSON.stringify(team, null, 4)}</code></pre></div>
        
        </div>
        
    )
    
}

export default TeamPage
