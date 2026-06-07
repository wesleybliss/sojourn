import { useWireValue } from '@forminator/react-wire'
import { Team } from '@repo/shared/types'
import dayjs from 'dayjs'
import { ChevronUp } from 'lucide-react'
import { useMemo } from 'react'

import { useAuth } from '@/components/providers/AuthProvider'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from '@/lib/router'
import * as store from '@/store'

const MAX_LATEST_TEAMS = 5

type TeamsMenuProps = {
    variant?: 'icon' | 'sidebar'
    isSidebarExpanded: boolean
}

const TeamsMenu = ({
    variant = 'icon',
    isSidebarExpanded,
}: TeamsMenuProps) => {
    
    const { loading, firebaseUser } = useAuth()
    
    const teams = useWireValue(store.teams)
    const currentTeam = useWireValue(store.currentTeam)
    
    const latestTeams = useMemo<Team[]>(() => (
        teams
            ?.filter(it => it.id !== currentTeam?.id)
            ?.sort((a: Team, b: Team) => (
                dayjs(a.createdAt)
                    .isAfter(dayjs(b.createdAt)) ? 1 : 0
            ))
            ?.slice(0, MAX_LATEST_TEAMS) || []
    ), [teams, currentTeam])
    
    if (loading || !firebaseUser || !currentTeam || !teams?.length)
        return null
    
    return (
        
        <DropdownMenu>
            
            <DropdownMenuTrigger asChild>
                {variant === 'sidebar' ? (
                    <button
                        className="flex w-full items-center gap-3 rounded-2xl bg-sidebar-accent/70
                            px-3 py-3 text-left outline-none transition-colors hover:bg-sidebar-accent
                            data-[state=open]:bg-sidebar-accent"
                        type="button">
                        <div
                            className="flex size-11 items-center justify-center overflow-hidden
                                rounded-full bg-sidebar-primary text-sm font-semibold
                                text-sidebar-primary-foreground">
                            {currentTeam?.name?.substring(0, 1)?.toUpperCase() ?? '?'}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold">
                                {currentTeam?.name}
                            </div>
                        </div>
                        <ChevronUp className="size-4 shrink-0 text-sidebar-foreground/60" />
                    </button>
                ) : (
                    <button className="outline-none" type="button">
                        <div
                            className="flex size-9 items-center justify-center rounded-full
                                bg-primary text-xs font-semibold text-primary-foreground">
                            {currentTeam?.name?.substring(0, 1)?.toUpperCase() ?? '?'}
                        </div>
                    </button>
                )}
            </DropdownMenuTrigger>
            
            <DropdownMenuContent
                align="end"
                side={isSidebarExpanded ? 'top' : 'right'}
                sideOffset={10}>
                
                <DropdownMenuLabel>
                    Current Team
                </DropdownMenuLabel>
                
                <DropdownMenuItem disabled>
                    {currentTeam?.name ?? '?'}
                </DropdownMenuItem>
                
                {latestTeams?.length > 0 && (<>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuLabel>
                        Available Teams
                    </DropdownMenuLabel>
                    
                    {latestTeams.map(it => (
                        <Link
                            key={`TeamsMenu-team-${it.id}`}
                            href={`/${it.id}`}>
                            <DropdownMenuItem>{it.name}</DropdownMenuItem>
                        </Link>
                    ))}
                    
                    {latestTeams.length > MAX_LATEST_TEAMS && (<>
                        <DropdownMenuSeparator />
                        <Link
                            href="/teams">
                            <DropdownMenuItem>All Teams</DropdownMenuItem>
                        </Link>
                    </>)}
                
                </>)}
                
                <DropdownMenuSeparator />
                
                <Link href="/teams">
                    <DropdownMenuItem>
                        Manage Teams
                    </DropdownMenuItem>
                </Link>
                
                <Link href="/teams/create">
                    <DropdownMenuItem>
                        Create a New Team
                    </DropdownMenuItem>
                </Link>
            
            </DropdownMenuContent>
        </DropdownMenu>
        
    )
    
}

export default TeamsMenu
