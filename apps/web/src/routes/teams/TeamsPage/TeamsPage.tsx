import dayjs from 'dayjs'
import { SquarePen, UserRoundPlus } from 'lucide-react'
import { Link } from 'react-router'

import InviteTeamMembersDialog from '@/components/dialogs/InviteTeamMembersDialog'
import UpdateTeamDialog from '@/components/dialogs/UpdateTeamDialog'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useTeamsPageViewModel from '@/routes/teams/TeamsPage/TeamsPageViewModel'

const TeamsPage = () => {
    
    const vm = useTeamsPageViewModel()
    
    if (vm.isError) return (
        <div>
            <p>Error loading teams</p>
            <pre><code>{JSON.stringify(vm.error, null, 4)}</code></pre>
        </div>
    )
    
    if (vm.isPending) return (
        <LoadingSpinner />
    )
    
    return (
        
        <div>
            
            <header className="flex justify-end items-center gap-3 mt-2 mb-4">
                <Link to="/teams/create">
                    <Button>
                        <UserRoundPlus />
                        New Team
                    </Button>
                </Link>
            </header>
            
            {vm.error && <div><pre><code>{JSON.stringify(vm.error, null, 4)}</code></pre></div>}
            
            {/*<div><pre><code>{JSON.stringify(teams, null, 4)}</code></pre></div>*/}
            
            <div className="section-card p-3">
                <table className="table-auto w-full text-sm">
                    <thead className="bg-surface-container-low text-left text-xs uppercase
                        tracking-[0.18em] text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Description</th>
                            <th className="px-4 py-3 font-medium">Created</th>
                            <th className="px-4 py-3 font-medium">Members</th>
                            <th className="px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                        {vm.teams?.map(it => (
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
                                    <div className="flex items-center content-center gap-3">
                                        <Badge variant="secondary">
                                            {it.members?.length || '0'}
                                        </Badge>
                                        <ul>
                                            {it.members?.map(m => (
                                                <li key={m.id}>{m.name} - {m.email}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium">
                                    <div className="flex justify-center items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            onClick={() => vm.updateTeamDialogId.setValue(it.id)}>
                                            <SquarePen />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => vm.inviteTeamMemberDialogTeamId.setValue(it.id)}>
                                            <UserRoundPlus />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <UpdateTeamDialog />
            <InviteTeamMembersDialog />
        
        </div>
        
    )
    
}

export default TeamsPage
