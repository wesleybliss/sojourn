import useNavbarLinks, { NavbarLink } from '@/hooks/useNavbarLinks'
import Link from 'next/link'
import Gravatar from '@/components/Gravatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useAuth } from '@/components/providers/AuthProvider'
import { useTripsQuery } from '@/lib/queries/trips'
import { useState } from 'react'
import { useBackupTrips } from '@/lib/queries/backups'
import { toast } from 'sonner'
import { fetchJSON } from '@/lib/api'
import { Trip } from '@/types/database'

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
    
    const { data: trips } = useTripsQuery()
    
    const [deleteDatabaseDialogOpen, setDeleteDatabaseDialogOpen] = useState(false)
    
    const backupMutation = useBackupTrips()
    
    const links = useNavbarLinks(user, trips, backupMutation, debugDumpData, setDeleteDatabaseDialogOpen)
    
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
