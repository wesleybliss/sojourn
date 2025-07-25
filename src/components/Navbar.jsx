'use client'

import { useState, useMemo } from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import ThemeToggle from '@/components/ThemeToggle'
import ConfirmDialog from '@/components/ConfirmDialog'
import { toast } from 'sonner'

// New Turso/Drizzle imports
import {
    getAllTrips,
    getAllSegments,
} from '@/lib/api/tripQueries.js'

const debugDumpData = async e => {
    
    e.preventDefault()
    
    try {
        const trips = await getAllTrips()
        const segments = await getAllSegments()
        
        const data = {
            trips,
            segments,
        }
        
        console.log('debug:dump', JSON.stringify(data, null, 2), data)
        toast.success('Database data dumped to console')
        
    } catch (error) {
        console.error('Error dumping data:', error)
        toast.error('Failed to dump database data')
    }
    
}

const Navbar = () => {
    
    const [deleteDatabaseDialogOpen, setDeleteDatabaseDialogOpen] = useState(false)
    
    const links = useMemo(() => [
        ['/', 'Home'],
        ['/trips', 'Trips'],
        ['/debug', 'Debug', 'Debug'],
        ['#debug:dump', 'Debug/Dump', debugDumpData],
        ['#debug:clear', 'Debug/Clear', e => {
            e.preventDefault()
            setDeleteDatabaseDialogOpen(true)
        }],
        ['#debug:backup', 'Backup', async e => {
            e.preventDefault()
            try {
                const trips = await getAllTrips()
                const segments = await getAllSegments()
                
                const backupData = {
                    version: '1.0',
                    exportDate: new Date().toISOString(),
                    trips,
                    segments,
                }
                
                const blob = new Blob([JSON.stringify(backupData, null, 2)], {
                    type: 'application/json'
                })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `trip-planner-backup-${new Date().toISOString().split('T')[0]}.json`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
                
                toast.success('Backup file downloaded')
            } catch (error) {
                console.error('Error creating backup:', error)
                toast.error('Failed to create backup')
            }
        }],
    ], [])
    
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
            
            <div className="flex gap-2">
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
