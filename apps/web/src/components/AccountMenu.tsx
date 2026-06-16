import { useWireValue } from '@forminator/react-wire'
import { fetchJSON } from '@repo/shared/utils/api'
import { Trip, User } from '@shared/types/database.types'
import { ChevronUp, LogOut } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import Gravatar from '@/components/Gravatar'
import { useAuth } from '@/components/providers/AuthProvider'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useNavbarLinks, { NavbarLink } from '@/hooks/useNavbarLinks'
import { useBackupTrips } from '@/lib/queries/backups'
import { Link } from '@/lib/router'
import * as store from '@/store'

const debugDumpData = (trips: Trip[] | null) => (e: MouseEvent) => {
    
    e.preventDefault()
    
    try {
        const data = {
            trips,
        }
        
        console.log('debug:dump', JSON.stringify(data, null, 2), data)
        toast.success('Database data dumped to console')
    } catch (error) {
        console.error('Error dumping data:', error)
        toast.error('Failed to dump database data')
    }
    
}

type AccountMenuProps = {
    variant?: 'icon' | 'sidebar'
    isSidebarExpanded: boolean
}

const AccountMenu = ({
    variant = 'icon',
    isSidebarExpanded,
}: AccountMenuProps) => {
    
    const {
        firebaseUser,
        loading,
        user,
        signOut: firebaseSignOut,
    } = useAuth()
    
    const trips = useWireValue(store.trips)
    
    const menuUser = user || (
        firebaseUser
            ? {
                email: firebaseUser.email || '',
                firebaseUid: firebaseUser.uid,
                name: firebaseUser.displayName || firebaseUser.email || 'Member',
                photoUrl: firebaseUser.photoURL,
            } as User
            : null
    )
    
    const [deleteDatabaseDialogOpen, setDeleteDatabaseDialogOpen] = useState(false)
    
    const backupMutation = useBackupTrips()
    
    const links = useNavbarLinks(
        menuUser,
        trips as Trip[] | null | undefined,
        backupMutation,
        debugDumpData,
        setDeleteDatabaseDialogOpen,
    )
    
    const debugDeleteDatabase = async () => {
        
        try {
            await fetchJSON('debug/clear-all', {
                method: 'POST',
            })
            
            setDeleteDatabaseDialogOpen(false)
            toast.success('Database cleared successfully')
            window.location.replace('/trips')
        } catch (error) {
            console.error('Error clearing database:', error)
            toast.error('Failed to clear database')
            setDeleteDatabaseDialogOpen(false)
        }
        
    }
    
    const handleSignOut = async (e: MouseEvent) => {
        e.preventDefault()
        
        try {
            await firebaseSignOut()
            window.location.href = '/login'
        } catch (error) {
            console.error('Sign out error:', error)
            toast.error('Failed to sign out')
        }
    }
    
    if (!firebaseUser || !menuUser)
        return null
    
    const displayName = menuUser.name || firebaseUser.displayName || menuUser.email || 'Member'
    const displayEmail = menuUser.email || firebaseUser.email || ''
    
    return (<>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {variant === 'sidebar' ? (
                    <button
                        className="flex w-full items-center gap-3 rounded-2xl bg-sidebar-accent/70
                            px-3 py-3 text-left outline-none transition-colors hover:bg-sidebar-accent
                            data-[state=open]:bg-sidebar-accent"
                        type="button">
                        {user ? (
                            <Gravatar
                                user={user}
                                className="flex size-11 items-center justify-center overflow-hidden"
                                imageClassName="h-full w-full object-cover"
                                size={44} />
                        ) : (
                            <div
                                className="flex size-11 items-center justify-center overflow-hidden
                                    rounded-full bg-sidebar-primary text-sm font-semibold
                                    text-sidebar-primary-foreground">
                                {displayName.substring(0, 1).toUpperCase()}
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold">
                                {displayName}
                            </div>
                            <span className="truncate text-xs text-sidebar-foreground/55">
                                {displayEmail || (loading ? 'Loading profile...' : 'Authenticated')}
                            </span>
                            <div className="mt-1 flex items-center gap-2">
                                <span
                                    className="rounded-full bg-sidebar-primary px-2 py-0.5
                                        text-[10px] font-semibold uppercase tracking-[0.18em]
                                        text-sidebar-primary-foreground">
                                    Member
                                </span>
                            </div>
                        </div>
                        <ChevronUp className="size-4 shrink-0 text-sidebar-foreground/60" />
                    </button>
                ) : (
                    <button className="outline-none" type="button">
                        {user ? (
                            <Gravatar user={user} />
                        ) : (
                            <div
                                className="flex size-9 items-center justify-center rounded-full
                                    bg-primary text-xs font-semibold text-primary-foreground">
                                {displayName.substring(0, 1).toUpperCase()}
                            </div>
                        )}
                    </button>
                )}
            </DropdownMenuTrigger>
            
            <DropdownMenuContent
                align="end"
                side={isSidebarExpanded ? 'top' : 'right'}
                sideOffset={10}>
                <DropdownMenuLabel>{displayEmail || displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {links.map(([url, label, onClick]: NavbarLink) => (
                    <Link
                        key={`AccountMenu-${url}`}
                        href={url}
                        onClick={e => onClick?.(e as unknown as MouseEvent)}>
                        <DropdownMenuItem>{label}</DropdownMenuItem>
                    </Link>
                ))}
                
                <DropdownMenuSeparator />
                
                <Link
                    href="#"
                    onClick={e => handleSignOut(e as unknown as MouseEvent)}>
                    <DropdownMenuItem>
                        <LogOut />
                        Logout
                    </DropdownMenuItem>
                </Link>
            
            </DropdownMenuContent>
        </DropdownMenu>
        
        <ConfirmDialog
            open={deleteDatabaseDialogOpen}
            title="Delete Database"
            message="Are you sure you want to delete the entire database?"
            cancelLabel="Cancel"
            onCancel={() => setDeleteDatabaseDialogOpen(false)}
            confirmLabel="Delete"
            onConfirm={debugDeleteDatabase} />
    </>)
    
}

export default AccountMenu
