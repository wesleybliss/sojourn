import { useWireState } from '@forminator/react-wire'
import { cn } from '@repo/shared/utils'
import { Compass, Map, Settings2 } from 'lucide-react'
import { memo, useMemo } from 'react'
import { GoSidebarExpand } from 'react-icons/go'

import AccountMenu from '@/components/AccountMenu'
import { useAuth } from '@/components/providers/AuthProvider'
import { Link, usePathname } from '@/lib/router'
import * as store from '@/store'

import { Button } from './ui/button'

const navigationItems = [
    {
        href: '/',
        label: 'My Trips',
        caption: 'Journeys',
        icon: Map,
    },
    {
        href: '/places',
        label: 'Places',
        caption: 'Saved research',
        icon: Compass,
    },
    {
        href: '/debug',
        label: 'Settings',
        caption: 'Workspace tools',
        icon: Settings2,
    },
]

const Sidebar = () => {
    
    const pathname = usePathname()
    const { firebaseUser } = useAuth()
    
    const [isSidebarExpanded, setIsSidebarExpanded] = useWireState(store.isSidebarExpanded)
    
    const showSignedInState = useMemo(() => Boolean(firebaseUser), [firebaseUser])
    
    return (
        
        <aside
            data-testid="Sidebar"
            className={cn(
                'tropical-glow relative section-card flex shrink-0 flex-col overflow-hidden border-none',
                'bg-sidebar text-sidebar-foreground md:max-w-[18rem]',
                'lg:top-2 lg:sticky lg:h-[calc(100vh-1.6rem)]',
                'transition-width duration-300 ease-in-out', {
                    'w-full md:w-auto lg:w-70': isSidebarExpanded,
                    'w-20': !isSidebarExpanded,
                })}>
            
            <div className="p-5">
                <Link href="/" className="block">
                    <div className="eyebrow mb-2">
                        <img className="size-10" src="/logo.png" alt="Sojourn" />
                    </div>
                    <div className={cn('font-headline text-2xl font-semibold tracking-[-0.04em]',
                        'transition-opacity duration-600 ease-in-out', {
                            'w-px opacity-0 overflow-hidden': !isSidebarExpanded,
                        },
                    )}>
                        Sojourn
                    </div>
                </Link>
                <div className={cn('flex', {
                    'justify-end': isSidebarExpanded,
                    'justify-center': !isSidebarExpanded,
                })}>
                    <Button
                        className="bg-accent/30 text-accent-foreground hover:bg-accent/40"
                        size="icon"
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                        <GoSidebarExpand className={cn('size-5 transition-transform duration-300 ease-in-out', {
                            'rotate-180': !isSidebarExpanded,
                            'rotate-0': isSidebarExpanded,
                        })} />
                    </Button>
                </div>
            </div>
            
            <nav className="flex flex-1 flex-row gap-8 overflow-x-auto p-5 md:flex-col md:overflow-visible">
                {navigationItems.map(item => {
                    const isActive = item.href === '/'
                        ? pathname === '/'
                        : pathname?.startsWith(item.href)
                    const Icon = item.icon
                    
                    return (
                        
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn('group flex items-center gap-3', {
                                'mx-auto': !isSidebarExpanded,
                            })}>
                            <span className={cn(
                                'flex size-10 items-center justify-center rounded-xl border transition-colors',
                                isActive
                                    ? 'border-sidebar-primary/10 bg-sidebar-primary text-sidebar-primary-foreground'
                                    : 'border-sidebar-border/70 bg-sidebar-accent/60 text-sidebar-foreground/80'
                                        + ' group-hover:bg-sidebar-accent',
                            )}>
                                <Icon className="size-4.5" />
                            </span>
                            <span className={cn('min-w-0', {
                                'hidden': !isSidebarExpanded,
                            })}>
                                <span className="block text-sm font-semibold">{item.label}</span>
                                <span className="block text-xs text-sidebar-foreground/55">
                                    {item.caption}
                                </span>
                            </span>
                        </Link>
                        
                    )
                })}
            </nav>
            
            <div className={cn('mb-2 p-4', {
                'mx-auto': !isSidebarExpanded,
            })}>
                {showSignedInState ? (
                    <AccountMenu variant={isSidebarExpanded ? 'sidebar' : 'icon'} />
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
    
}

export default memo(Sidebar)
