import { useState, useMemo } from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import ThemeToggle from '@/components/ThemeToggle'
import ConfirmDialog from '@/components/ConfirmDialog'

// @todo @debug
import db from '@/db'
import tripsRepo from '@/db/repositories/trips'
import segmentsRepo from '@/db/repositories/segments'
import { backupAllTrips } from '@/actions'

const debugDumpData = async e => {
    
    e.preventDefault()
    
    const trips = await tripsRepo.getAll()
    const segments = await segmentsRepo.getAll()
    
    const data = {
        trips,
        segments,
    }
    
    console.log('debug:dump', JSON.stringify(data, null, 2), data)
    
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
            await backupAllTrips()
        }],
    ], [])
    
    const debugDeleteDatabase = async () => {
        
        await db.delete()
        
        setDeleteDatabaseDialogOpen(false)
        window.location.replace('/trips')
        
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
