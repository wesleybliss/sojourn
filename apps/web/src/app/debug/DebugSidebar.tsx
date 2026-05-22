import Link from 'next/link'

const debugSidebarLinks = [
    ['Places', '/debug/places'],
    ['Migrate Trips to Plans', '/debug/migrate-trips-plans'],
    ['Storage', '/debug/storage'],
]

interface DebugSidebarProps {
    className?: string
}

const DebugSidebar = ({
    className,
}: DebugSidebarProps) => {
    
    return (
        
        <aside className={`DebugSidebar h-screen bg-gray-100
            border-r p-3 flex flex-col gap-2 text-sm ${className || ''}`}>
            
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
