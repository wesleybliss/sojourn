import dayjs from 'dayjs'

import LoadingSpinner from '@/components/LoadingSpinner'
import { useTeamsQuery } from '@/lib/queries/teams'

const TeamsPage = () => {
    
    const {
        data: teams,
        isError,
        isPending,
        error,
    } = useTeamsQuery({ withMembers: true })
    
    if (isError) return (
        <div>
            <p>Error loading teams</p>
            <pre><code>{JSON.stringify(error, null, 4)}</code></pre>
        </div>
    )
    
    if (isPending) return (
        <LoadingSpinner />
    )
    
    return (
        
        <div className="p-3">
            
            <h1>Teams</h1>
            
            <div>
                <a href="/teams/create">Create Team</a>
            </div>
            
            {error && <div><pre><code>{JSON.stringify(error, null, 4)}</code></pre></div>}
            
            {/*<div><pre><code>{JSON.stringify(teams, null, 4)}</code></pre></div>*/}
            
            <table className="table-auto w-full text-sm">
                <thead className="bg-surface-container-low text-left text-xs uppercase
                    tracking-[0.18em] text-muted-foreground">
                    <tr>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Description</th>
                        <th className="px-4 py-3 font-medium">Created</th>
                        <th className="px-4 py-3 font-medium">Members</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                    {teams?.map(it => (
                        <tr key={it.id}>
                            <td className="px-4 py-3 font-medium">
                                {it.name}
                            </td>
                            <td className="px-4 py-3 font-medium">
                                {it.description}
                            </td>
                            <td className="px-4 py-3 font-medium">
                                {dayjs(it.createdAt).format('MMM D, YYYY h:mm A')}
                            </td>
                            <td className="px-4 py-3 font-medium">
                                {it.members?.length || '0'}
                                <ul>
                                    {it.members?.map(m => (
                                        <li key={m.id}>{m.name} - {m.email}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        </div>
        
    )
    
}

export default TeamsPage
