import ProtectedRoute from '@/components/ProtectedRoute'
import { useTeamsQuery } from '@/lib/queries/teams'

const TeamsPage = () => {
    
    const {
        data: teams,
        isLoading,
        error,
    } = useTeamsQuery({ withMembers: true })
    
    return (
        
        <ProtectedRoute>
            
            <h1>Teams</h1>
            
            <div>
                <a href="/teams/create">Create Team</a>
            </div>
            
            {isLoading && <p>Loading...</p>}
            
            {error && <div><pre><code>{JSON.stringify(error, null, 4)}</code></pre></div>}
            
            <div><pre><code>{JSON.stringify(teams, null, 4)}</code></pre></div>
        
        </ProtectedRoute>
        
    )
    
}

export default TeamsPage
