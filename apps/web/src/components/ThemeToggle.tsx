'use client'

import { useWireState } from '@forminator/react-wire'
import { Theme } from '@repo/shared/types'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import * as store from '@/store'

interface ThemeToggleProps {
    variant?: 'outline' | 'ghost' | 'default' | 'destructive' | 'link' | 'secondary' | null | undefined
}

const ThemeToggle = ({
    variant = 'outline',
}: ThemeToggleProps) => {
    
    const [theme, setTheme] = useWireState(store.theme)
    const [isMounted, setIsMounted] = useState(false)
    
    const applyTheme = (newTheme: Theme) => {
        if (typeof window === 'undefined') return
        
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const isDark = newTheme === 'dark' || (newTheme === 'system' && prefersDark)
        
        
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
        
    }
    
    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme)
        
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme)
        }
        
        applyTheme(newTheme)
    }
    
    useEffect(() => {
        setIsMounted(true)
        
        const savedTheme = typeof window !== 'undefined'
            ? localStorage.getItem('theme') || 'system'
            : 'system'
        
        setTheme(savedTheme as Theme)
        applyTheme(savedTheme as Theme)
        
        if (typeof window === 'undefined') return
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        
        const handleChange = () => {
            if (theme === 'system')
                applyTheme('system')
        }
        
        mediaQuery.addEventListener('change', handleChange)
        
        return () => mediaQuery.removeEventListener('change', handleChange)
        
    }, [setTheme, theme])
    
    // Prevent rendering theme-specific content until mounted
    if (!isMounted) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Sun className="size-5" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Light</DropdownMenuItem>
                    <DropdownMenuItem>Dark</DropdownMenuItem>
                    <DropdownMenuItem>System</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={variant} size="icon">
                    {theme === 'light' ? (
                        <Sun className="size-5" />
                    ) : (
                        <Moon className="size-5" />
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
