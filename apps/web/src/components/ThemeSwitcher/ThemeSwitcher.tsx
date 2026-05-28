'use client'

import { Themes } from '@shared/types'
import { cn } from '@shared/utils'
import { Monitor, Moon, Sun } from 'lucide-react'
import { memo } from 'react'

import useThemeSwitcherViewModel from '@/components/ThemeSwitcher/ThemeSwitcherViewModel'

const themes = [
    { value: Themes.light, icon: Sun },
    { value: Themes.dark, icon: Moon },
    { value: Themes.system, icon: Monitor },
]

const ThemeSwitcher = memo(() => {
    
    const vm = useThemeSwitcherViewModel()
    
    return (
        
        <div className={cn('p-2 gap-1', {
            'grid grid-cols-3': vm.isSidebarExpanded,
            'flex flex-col items-center bg-primary/10 rounded-lg': !vm.isSidebarExpanded,
        })}>
            
            {themes.map(({ value, icon: Icon }) => (
                
                <button
                    key={value}
                    onClick={() => vm.toggleTheme(value)}
                    className={cn(
                        'flex flex-col items-center justify-center gap-1.5 p-2 rounded-md transition-all border',
                        'hover:bg-accent hover:text-accent-foreground',
                        vm.theme === value
                            ? 'bg-accent border-accent-foreground/20 text-accent-foreground'
                            : 'border-transparent text-muted-foreground',
                    )}>
                    
                    <Icon className="size-4" />
                
                </button>
                
            ))}
        
        </div>
        
    )
    
})

export default ThemeSwitcher
