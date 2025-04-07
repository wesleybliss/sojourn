import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import ThemeToggle from '@/components/ThemeToggle'

const Navbar = () => {
    
    return (
        
        <nav className="flex items-center justify-between px-4 py-2 bg-background border-b">
            
            <div className="text-lg font-bold">
                Trip Planner Basic
            </div>
            
            <NavigationMenu>
                <NavigationMenuList className="flex gap-4">
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/" className="text-muted-foreground hover:text-foreground">
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/about" className="text-muted-foreground hover:text-foreground">
                            About
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/contact" className="text-muted-foreground hover:text-foreground">
                            Contact
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex gap-2">
                <ThemeToggle />
            </div>
        
        </nav>
        
    )
    
}

export default Navbar
