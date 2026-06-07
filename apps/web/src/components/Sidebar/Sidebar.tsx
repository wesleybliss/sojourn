import { useWireState } from '@forminator/react-wire'
import { cn } from '@repo/shared/utils'
import { Compass, Map, Settings2,Users } from 'lucide-react'
import { memo, useMemo } from 'react'
import { GoSidebarExpand } from 'react-icons/go'

import AccountMenu from '@/components/AccountMenu'
import { useAuth } from '@/components/providers/AuthProvider'
import SidebarNavItem from '@/components/Sidebar/SidebarNavItem'
import TeamsMenu from '@/components/teams/TeamsMenu'
import { Button } from '@/components/ui/button'
import { Link } from '@/lib/router'
import * as store from '@/store'

const navigationItems = [
    {
        href: '/',
        label: 'My Trips',
        caption: 'My Trips',
        icon: Map,
    },
    {
        href: '/places',
        label: 'Places',
        caption: 'Saved research',
        icon: Compass,
    },
    {
        href: '/teams',
        label: 'Teams',
        caption: 'Teams',
        icon: Users,
    },
    {
        href: '/debug',
        label: 'Settings',
        caption: 'Workspace tools',
        icon: Settings2,
    },
]

interface SidebarProps {
    isChild?: boolean
}

const Sidebar = memo(({
    isChild = false,
}: SidebarProps) => {
    
    const { firebaseUser } = useAuth()
    
    const [isSidebarExpandedValue, setIsSidebarExpanded] = useWireState(store.isSidebarExpanded)
    
    const isSidebarExpanded = useMemo(() => (
        isChild ? true : isSidebarExpandedValue
    ), [isChild, isSidebarExpandedValue])
    
    const showSignedInState = useMemo(() => Boolean(firebaseUser), [firebaseUser])
    
    return (
        
        <aside
            data-testid="Sidebar"
            className={cn(
                'tropical-glow-muted relative section-card shrink-0 flex-col overflow-hidden border-none',
                'bg-sidebar text-sidebar-foreground md:max-w-[18rem]',
                'lg:top-3 lg:sticky lg:h-[calc(100vh-1.4rem)]',
                'transition-width duration-300 ease-in-out', {
                    'flex p-0 shadow-lg outline': isChild,
                    'hidden lg:flex max-w-full': !isChild,
                    'w-full md:w-auto lg:w-70': isSidebarExpanded,
                    'w-18': !isSidebarExpanded,
                })}>
            
            <div className={cn({
                'p-5': isSidebarExpanded,
                'pt-5 mx-auto': !isSidebarExpanded,
            })}>
                <Link href="/" className="group block outline-none">
                    <div className="eyebrow mb-2 group-hover:scale-150
                        group-hover:rotate-12
                        transition-transform duration-300 ease-in-out">
                        <img className="size-10" src="/logo.png" alt="Sojourn" />
                    </div>
                </Link>
                <div className={cn('font-headline text-2xl font-semibold tracking-[-0.04em]',
                    'transition-opacity duration-600 ease-in-out', {
                        'w-px opacity-0 overflow-hidden': !isSidebarExpanded,
                    },
                )}>
                    Sojourn
                </div>
                <div className={cn('flex', {
                    'hidden': isChild,
                    'justify-end': isSidebarExpanded,
                    'justify-center': !isSidebarExpanded,
                })}>
                    <Button
                        className="bg-accent/30 text-accent-foreground hover:bg-accent/40"
                        size="icon"
                        aria-label="Toggle sidebar"
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                        <GoSidebarExpand className={cn('size-5 transition-transform duration-300 ease-in-out', {
                            'rotate-180': !isSidebarExpanded,
                            'rotate-0': isSidebarExpanded,
                        })} />
                    </Button>
                </div>
            </div>
            
            <nav className={cn('flex flex-1 flex-col gap-4 overflow-x-auto md:overflow-visible', {
                'p-5': isSidebarExpanded,
                'pt-5 items-center content-center': !isSidebarExpanded,
            })}>
                {navigationItems.map(item => (
                    <SidebarNavItem
                        key={item.href}
                        item={item}
                        isSidebarExpanded={isSidebarExpanded} />
                ))}
            </nav>
            
            <div className={cn('mb-2 p-4', {
                'mx-auto': !isSidebarExpanded,
            })}>
                {showSignedInState && (
                    <TeamsMenu
                        variant={isSidebarExpanded ? 'sidebar' : 'icon'}
                        isSidebarExpanded={isSidebarExpanded} />
                )}
            </div>
            
            <div className={cn('mb-2 p-4', {
                'mx-auto': !isSidebarExpanded,
            })}>
                {showSignedInState ? (
                    <AccountMenu
                        variant={isSidebarExpanded ? 'sidebar' : 'icon'}
                        isSidebarExpanded={isSidebarExpanded} />
                ) : (
                    <div
                        className="rounded-2xl border border-dashed border-sidebar-border
                            px-4 py-5 text-sm text-sidebar-foreground/60">
                        Sign in to access your travel workspace.
                    </div>
                )}
            </div>
        
        </aside>
        
    )
    
})

export default Sidebar
