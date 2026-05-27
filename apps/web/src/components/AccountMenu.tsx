import { Trip } from '@repo/shared/types/database'
import { fetchJSON } from '@repo/shared/utils/api'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import ConfirmDialog from '@/components/ConfirmDialog'
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
import { useTripsQuery } from '@/lib/queries/trips'

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

const AccountMenu = () => {
    
    const { user, signOut: firebaseSignOut } = useAuth()
    
    const { data: trips } = useTripsQuery({
        options: {
            enabled: !!user,
        },
    })
    
    const [deleteDatabaseDialogOpen, setDeleteDatabaseDialogOpen] = useState(false)
    
    const backupMutation = useBackupTrips()
    
    const links = useNavbarLinks(
        user,
        trips as Trip[] | null | undefined,
        backupMutation,
        debugDumpData,
        setDeleteDatabaseDialogOpen,
    )
    
    const debugDeleteDatabase = async () => {
        
        try {
            // Since Turso is a remote database, we'll clear all data instead of deleting the DB
            await fetchJSON('/api/debug/clear-all', {
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
    
    if (!user) return null
    
    return (<>
        
        <DropdownMenu>
            
            <DropdownMenuTrigger className="outline-none">
                <Gravatar user={user} />
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end">
                
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
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
                    <DropdownMenuItem>Logout</DropdownMenuItem>
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
