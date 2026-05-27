'use client'

import { cn } from '@repo/shared/utils'
import { Compass, Map, Settings2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Gravatar from '@/components/Gravatar'
import { useAuth } from '@/components/providers/AuthProvider'

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
    const { user } = useAuth()
    
    return (
        
        <aside
            className="section-card flex w-full shrink-0 flex-col overflow-hidden border-none
                bg-sidebar text-sidebar-foreground md:w-auto md:max-w-[18rem]
                lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] lg:w-[17.5rem]">
            <div className="border-b border-sidebar-border/70 px-5 py-5">
                <Link href="/" className="block">
                    <div className="eyebrow mb-2">Slow Travel</div>
                    <div className="font-headline text-2xl font-semibold tracking-[-0.04em]">
                        Sojourn
                    </div>
                    <p className="mt-2 max-w-[18rem] text-sm text-sidebar-foreground/65">
                        Minimal planning workspace for deliberate, long-form itineraries.
                    </p>
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
                            className={cn(
                                'group flex min-w-[12rem] items-center gap-3 rounded-2xl border px-4 py-3',
                                'transition-colors md:min-w-0',
                                isActive
                                    ? 'border-sidebar-primary/15 bg-sidebar-accent text-sidebar-accent-foreground'
                                    : 'border-transparent bg-transparent text-sidebar-foreground/72'
                                        + ' hover:border-sidebar-border/70 hover:bg-sidebar-accent/70',
                            )}>
                            <span className={cn(
                                'flex size-10 items-center justify-center rounded-xl border transition-colors',
                                isActive
                                    ? 'border-sidebar-primary/10 bg-sidebar-primary text-sidebar-primary-foreground'
                                    : 'border-sidebar-border/70 bg-sidebar-accent/60 text-sidebar-foreground/80'
                                        + ' group-hover:bg-sidebar-accent',
                            )}>
                                <Icon className="size-[18px]" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-semibold">{item.label}</span>
                                <span className="block text-xs text-sidebar-foreground/55">
                                    {item.caption}
                                </span>
                            </span>
                        </Link>
                        
                    )
                })}
            </nav>
            
            <div className="border-t border-sidebar-border/70 p-4">
                {user ? (
                    <div
                        className="flex items-center gap-3 rounded-2xl bg-sidebar-accent/70
                            px-3 py-3">
                        <Gravatar
                            user={user}
                            className="flex size-11 items-center justify-center overflow-hidden"
                            imageClassName="h-full w-full object-cover"
                            size={44} />
                        <div className="min-w-0">
                            <div className="truncate text-sm font-semibold">
                                {user.name || user.email}
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                                <span
                                    className="rounded-full bg-sidebar-primary px-2 py-0.5
                                        text-[10px] font-semibold uppercase tracking-[0.18em]
                                        text-sidebar-primary-foreground">
                                    Member
                                </span>
                                <span className="truncate text-xs text-sidebar-foreground/55">
                                    {user.email}
                                </span>
                            </div>
                        </div>
                    </div>
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
