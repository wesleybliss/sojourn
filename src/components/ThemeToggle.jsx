import { useEffect } from 'react'
import { useWireState } from '@forminator/react-wire'
import * as store from '@/store'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ThemeToggle = () => {
    
    const [theme, setTheme] = useWireState(store.theme)
    
    const applyTheme = newTheme => {
        
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const isDark = newTheme === 'dark' || (newTheme === 'system' && prefersDark)
        
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
        
    }
    
    const toggleTheme = newTheme => {
        
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        applyTheme(newTheme)
        
    }
    
    useEffect(() => {
        
        const savedTheme = localStorage.getItem('theme') || 'system'
        
        setTheme(savedTheme)
        applyTheme(savedTheme)
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        
        const handleChange = () => {
            
            if (theme === 'system')
                applyTheme('system')
            
        }
        
        mediaQuery.addEventListener('change', handleChange)
        
        return () => mediaQuery.removeEventListener('change', handleChange)
        
    }, [theme])
    
    return (
        
        <DropdownMenu>
            
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {theme === 'light' ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toggleTheme('light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleTheme('dark')}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleTheme('system')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        
        </DropdownMenu>
        
    )
    
}

export default ThemeToggle
