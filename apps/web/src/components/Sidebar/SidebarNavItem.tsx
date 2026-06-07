import { cn } from '@repo/shared/utils'
import { ElementType, memo } from 'react'

import ConditionalTooltip from '@/components/ConditionalTooltip'
import { Link, usePathname } from '@/lib/router'

const linkClasses = {
    active: 'border-sidebar-primary/10 bg-sidebar-primary text-sidebar-primary-foreground',
    inactive: 'border-sidebar-border/70 bg-sidebar-accent/60 text-sidebar-foreground/80'
        + ' group-hover:bg-sidebar-accent',
}

export type TSidebarNavItem = {
    href: string
    label: string
    caption: string
    icon: ElementType
}

export interface SidebarNavItemProps {
    item: TSidebarNavItem
    isSidebarExpanded: boolean
}

const SidebarNavItem = memo(({
    item,
    isSidebarExpanded,
}: SidebarNavItemProps) => {
    
    const pathname = usePathname()
    
    const isActive = item.href === '/'
        ? pathname === '/'
        : pathname?.startsWith(item.href)
    
    const Icon = item.icon
    
    return (
        
        <ConditionalTooltip
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
                    '-translate-x-20 size-0 overflow-hidden opacity-0': !isSidebarExpanded,
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
    
})

export default SidebarNavItem
