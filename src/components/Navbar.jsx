import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import ThemeToggle from '@/components/ThemeToggle'

// @todo @debug
import tripsRepo from '@/db/repositories/trips'
import segmentsRepo from '@/db/repositories/segments'

const links = [
    ['/', 'Home'],
    ['/trips', 'Trips'],
    ['#debug:dump', 'Debug/Dump', async e => {
        e.preventDefault()
        
        const trips = await tripsRepo.getAll()
        const segments = await segmentsRepo.getAll()
        
        const data = {
            trips,
            segments,
        }
        
        console.log('debug:dump', JSON.stringify(data, null, 2), data)
    }],
    ['#debug:clear', 'Debug/Clear', e => {
        e.preventDefault()
        tripsRepo.clear()
        window.location.replace('/')
    }],
]

const Navbar = () => {
    
    return (
        
        <nav className="flex items-center justify-between px-4 py-2 bg-background border-b">
            
            <div className="text-lg font-bold">
                Trip Planner Basic
            </div>
            
            <NavigationMenu>
                <NavigationMenuList className="flex gap-4">
                    {links.map(([url, label, onClick]) => (
                        <NavigationMenuItem key={`Navbar-${url}`}>
                            <NavigationMenuLink
                                className="text-muted-foreground hover:text-foreground" 
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
        
        </nav>
        
    )
    
}

export default Navbar
