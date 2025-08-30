'use client'

import { useState, useMemo } from 'react'
import { useTripsQuery } from '@/lib/queries/trips.js'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import ThemeToggle from '@/components/ThemeToggle'
import ConfirmDialog from '@/components/ConfirmDialog'
import { toast } from 'sonner'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useBackupTrips } from '@/lib/queries/backups'

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

const Navbar = () => {
    
    const { data: session } = useSession()
    const user = session?.user
    
    const { data: trips } = useTripsQuery()
    
    const [deleteDatabaseDialogOpen, setDeleteDatabaseDialogOpen] = useState(false)
    
    const backupMutation = useBackupTrips()
    
    const links = useMemo(() => {
        
        if (!user || !trips?.data)
            return [
                ['/', 'Home'],
                ['/login', 'Login'],
                ['/signup', 'Sign Up'],
            ]
        
        return [
            ['/', 'Home'],
            ['/trips', 'Trips'],
            ['/debug', 'Debug', 'Debug'],
            ['#debug:dump', 'Debug/Dump', debugDumpData(trips?.data)],
            ['#debug:clear', 'Debug/Clear', e => {
                e.preventDefault()
                setDeleteDatabaseDialogOpen(true)
            }],
            /* ['#debug:backup', 'Backup', async e => {
                e.preventDefault()
                
                try {
                    
                    const backupData = {
                        version: '1.0',
                        exportDate: new Date().toISOString(),
                        trips: trips.data,
                    }
                    
                    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
                        type: 'application/json',
                    })
                    
                    const url = URL.createObjectURL(blob)
                    // eslint-disable-next-line no-restricted-globals
                    const a = document.createElement('a')
                    
                    a.href = url
                    a.download = `trip-planner-backup-${new Date().toISOString().split('T')[0]}.json`
                    
                    // eslint-disable-next-line no-restricted-globals
                    document.body.appendChild(a)
                    
                    a.click()
                    
                    // eslint-disable-next-line no-restricted-globals
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                    
                    toast.success('Backup file downloaded')
                } catch (error) {
                    console.error('Error creating backup:', error)
                    toast.error('Failed to create backup')
                }
            }], */
            ['#debug:backup', 'Backup', async e => {
                e.preventDefault()
                
                try {
                    await backupMutation.mutateAsync({ type: 'multiple' })
                    toast.success('Backup file downloaded')
                } catch (error) {
                    console.error('Error creating backup:', error)
                    toast.error('Failed to create backup')
                }
            }],
        ]
    }, [trips, user, backupMutation])
    
    const debugDeleteDatabase = async () => {
        
        try {
            // Since Turso is a remote database, we'll clear all data instead of deleting the DB
            const response = await fetch('/api/debug/clear-all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
    
    return (
        
        <nav className="flex items-center justify-between px-4 py-2 bg-background border-b">
            
            <div className="text-sm font-bold">
                Trip Planner Basic
            </div>
            
            <NavigationMenu>
                <NavigationMenuList className="flex gap-4">
                    {links.map(([url, label, onClick]) => (
                        <NavigationMenuItem key={`Navbar-${url}`}>
                            <NavigationMenuLink
                                className="text-xs text-muted-foreground hover:text-foreground" 
                                href={url}
                                onClick={onClick}>
                                {label}
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex gap-2 items-center">
                {user && (
                    <span className="text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
                {user && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="text-xs">
                        Logout
                    </Button>
                )}
                <ThemeToggle />
            </div>
            
            <ConfirmDialog
                open={deleteDatabaseDialogOpen}
                title="Delete Database"
                message="Are you sure you want to delete the entire database?"
                cancelLabel="Cancel"
                onCancel={() => setDeleteDatabaseDialogOpen(false)}
                confirmLabel="Delete"
                onConfirm={debugDeleteDatabase} />
        
        </nav>
        
    )
    
}

export default Navbar
