import { Link } from '@/lib/router'

const debugSidebarLinks = [
    ['Places', '/debug/places'],
    ['Migrate Trips to Plans', '/debug/migrate-trips-plans'],
    ['Storage', '/debug/storage'],
    ['Geocode Tool', '/debug/geocode-tool'],
    ['City Search', '/debug/city-search'],
]

interface DebugSidebarProps {
    className?: string
}

const DebugSidebar = ({
    className,
}: DebugSidebarProps) => {
    
    return (
        
        <aside className={`DebugSidebar h-screen section-card
            p-8 flex flex-col gap-2 text-sm ${className || ''}`}>
            
            <header className="flex items-center justify-between mb-8">
                <h1 className="font-bold opacity-50">Debug</h1>
            </header>
            
            {debugSidebarLinks.map(([label, url]) => (
                <Link key={url} href={url}>
                    {label}
                </Link>
            ))}
        
        </aside>
        
    )
    
}

export default DebugSidebar
