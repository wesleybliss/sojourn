import { Themes } from '@shared/types'
import { cn } from '@shared/utils'
import { Monitor, Moon, Sun } from 'lucide-react'
import { memo } from 'react'

import useThemeSwitcherViewModel from '@/components/ThemeSwitcher/ThemeSwitcherViewModel'
import { Button } from '@/components/ui/button'

const themes = [
    { value: Themes.light, icon: Sun },
    { value: Themes.dark, icon: Moon },
    { value: Themes.system, icon: Monitor },
]

const ThemeSwitcher = memo(() => {
    
    const vm = useThemeSwitcherViewModel()
    
    return (
        
        <div className="p-[6px] flex items-center bg-primary/10 rounded-lg gap-1">
            
            {themes.map(({ value, icon: Icon }) => (
                
                <Button
                    key={value}
                    size="xs"
                    variant="ghost"
                    onClick={() => vm.toggleTheme(value)}
                    className={cn(
                        vm.theme === value
                            ? 'bg-accent border-accent-foreground/20 text-accent-foreground'
                            : 'border-transparent text-muted-foreground',
                    )}>
                    
                    <Icon className="size-3" />
                
                </Button>
                
            ))}
        
        </div>
        
    )
    
})

export default memo(ThemeSwitcher)
