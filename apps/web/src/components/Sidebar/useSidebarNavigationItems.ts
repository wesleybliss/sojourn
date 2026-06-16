import { useWireValue } from '@forminator/react-wire'
import { Compass, Map, Settings2, Users } from 'lucide-react'
import { useCallback, useMemo } from 'react'

import * as store from '@/store'

export type SidebarNavigationItem = {
    href: string
    label: string
    caption: string
    icon: React.ComponentType<{ className?: string }>
    noPrefix?: boolean
}

const useSidebarNavigationItems = (): SidebarNavigationItem[] => {
    
    const currentTeamId = useWireValue(store.currentTeamId)
    
    const withTeamId = useCallback((item: SidebarNavigationItem): SidebarNavigationItem => {
        
        if (item.noPrefix) return {
            ...item,
            href: item.href,
        }
        
        const prefix = currentTeamId ? `/${currentTeamId}` : ''
        
        return {
            ...item,
            href: `${prefix}${item.href}`,
        }
        
    }, [currentTeamId])
    
    return useMemo<SidebarNavigationItem[]>(() => {
        
        return [
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
                noPrefix: true,
            },
            {
                href: '/debug',
                label: 'Settings',
                caption: 'Workspace tools',
                icon: Settings2,
            },
        ].map(it => withTeamId(it))
        
    }, [currentTeamId])
    
}

export default useSidebarNavigationItems
