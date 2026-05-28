'use client'

import { useWireState } from '@forminator/react-wire'
import { cn } from '@repo/shared/utils'
import { Compass, Map, Settings2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoSidebarExpand } from 'react-icons/go'

import AccountMenu from '@/components/AccountMenu'
import { useAuth } from '@/components/providers/AuthProvider'
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
    
    const showSignedInState = Boolean(firebaseUser)
    
    return (
        
        <aside
            data-testid="Sidebar"
            className={cn(
                'tropical-glow relative section-card flex shrink-0 flex-col overflow-hidden border-none',
                'bg-sidebar text-sidebar-foreground md:max-w-[18rem]',
                'lg:sticky lg:h-[calc(100vh-1rem)]',
                'transition-width duration-300 ease-in-out', {
                    'w-full md:w-auto lg:w-70': isSidebarExpanded,
                    'w-20': !isSidebarExpanded,
                })}>
            
            <div className="p-5">
                <Link href="/" className="block">
                    <div className="eyebrow mb-2">
                        <img className="size-12" src="/logo.png" alt="Sojourn" />
                    </div>
                    {isSidebarExpanded && (
                        <div className="font-headline text-2xl font-semibold tracking-[-0.04em]">
                            Sojourn
                        </div>
                    )}
                    <div className={cn('flex', {
                        'justify-end': isSidebarExpanded,
                        'justify-center': !isSidebarExpanded,
                    })}>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                            <GoSidebarExpand className="size-5" />
                        </Button>
                    </div>
                </Link>
            </div>
            
            <nav className="flex flex-1 flex-row gap-2 overflow-x-auto p-3 md:flex-col md:overflow-visible">
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
                                <Icon className="size-[18px]" />
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

export default Sidebar
