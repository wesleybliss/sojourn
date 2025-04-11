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
import * as store from '@/store'

const debugSeedTripSegments = async () => {
    
    const tripId = store.currentTripId.getValue()
    
    if (!tripId) return console.error('No current trip ID')
    
    const segments = [
        {
            tripId,
            name: 'Madrid',
            description: 'New segment description',
            color: 'bg-blue-500',
            startDate: '2025-08-20T05:00:00.000Z',
            endDate: '2025-09-09T05:00:00.000Z',
            id: '87869b48-b348-482b-8363-a90aca3d8616',
            createdAt: '2025-04-10T22:26:52.167Z',
            updatedAt: '2025-04-10T22:27:25.531Z'
        },
        {
            tripId,
            name: 'Napoli',
            description: 'New segment description',
            color: 'bg-blue-500',
            startDate: '2025-09-09T05:00:00.000Z',
            endDate: '2025-04-19T05:00:00.000Z',
            id: 'de58b90d-14c0-48eb-92e6-555b4d4a9475',
            createdAt: '2025-04-10T22:27:28.541Z',
            updatedAt: '2025-04-10T22:27:38.730Z'
        }
    ]
    
}

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
