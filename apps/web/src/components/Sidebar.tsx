import { useWireState } from '@forminator/react-wire'
import { cn } from '@repo/shared/utils'
import { Compass, Map, Settings2 } from 'lucide-react'
import { memo, useMemo } from 'react'
import { GoSidebarExpand } from 'react-icons/go'

import AccountMenu from '@/components/AccountMenu'
import ConditionalTooltip from '@/components/ConditionalTooltip'
import { useAuth } from '@/components/providers/AuthProvider'
import { Link, usePathname } from '@/lib/router'
import * as store from '@/store'

import { Button } from './ui/button'

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
        href: '/debug',
        label: 'Settings',
        caption: 'Workspace tools',
        icon: Settings2,
    },
]

const linkClasses = {
    active: 'border-sidebar-primary/10 bg-sidebar-primary text-sidebar-primary-foreground',
    inactive: 'border-sidebar-border/70 bg-sidebar-accent/60 text-sidebar-foreground/80'
        + ' group-hover:bg-sidebar-accent',
}

interface SidebarProps {
    isChild?: boolean
}

const Sidebar = ({
    isChild = false,
}: SidebarProps) => {
    
    const pathname = usePathname()
    const { firebaseUser } = useAuth()
    
    const [isSidebarExpanded, setIsSidebarExpanded] = useWireState(store.isSidebarExpanded)
    
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
                    'hidden md:flex max-w-full': !isChild,
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
                {navigationItems.map(item => {
                    
                    const isActive = item.href === '/'
                        ? pathname === '/'
                        : pathname?.startsWith(item.href)
                    
                    const Icon = item.icon
                    
                    return (
                        
                        <ConditionalTooltip
                            key={item.href}
                            enabled={!isSidebarExpanded}
                            content={item.caption}>
                            
                            <Link
                                className={cn('group flex items-center gap-3', {
                                    'mx-auto translate-x-1.5': !isSidebarExpanded,
                                })}
                                href={item.href}>
                                
                                <span className={cn(
                                    'flex size-10 items-center justify-center rounded-xl border transition-colors',
                                    isActive ? linkClasses.active : linkClasses.inactive,
                                )}>
                                    <Icon className="size-4.5" />
                                </span>
                                
                                <span className={cn('min-w-0 transition-all duration-200 ease-in-out', {
                                    '-translate-x-20 w-0 overflow-hidden opacity-0': !isSidebarExpanded,
                                })}>
                                    <span className="block text-sm font-semibold">
                                        {item.label}
                                    </span>
                                    <span className="block text-xs text-sidebar-foreground/55">
                                        {item.caption}
                                    </span>
                                </span>
                            
                            </Link>
                        
                        </ConditionalTooltip>
                        
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
