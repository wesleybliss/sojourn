import useNavbarLinks from '@/hooks/useNavbarLinks'
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
import { useTripsQuery } from '@/lib/queries/trips.js'
import { useState } from 'react'
import { useBackupTrips } from '@/lib/queries/backups.js'
import { toast } from 'sonner'

const debugDumpData = trips => e => {
    
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
            const response = await fetch('/api/debug/clear-all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error('Failed to clear database')
            }

            setDeleteDatabaseDialogOpen(false)
            toast.success('Database cleared successfully')
            window.location.replace('/trips')

        } catch (error) {
            console.error('Error clearing database:', error)
            toast.error('Failed to clear database')
            setDeleteDatabaseDialogOpen(false)
        }

    }

    const handleSignOut = async (e) => {
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

                {links.map(([url, label, onClick]) => (
                    <Link key={`AccountMenu-${url}`} href={url} onClick={onClick}>
                        <DropdownMenuItem>{label}</DropdownMenuItem>
                    </Link>
                ))}

                <DropdownMenuSeparator />

                <Link
                    href="#"
                    onClick={handleSignOut}>
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
