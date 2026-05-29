import { useWireState } from '@forminator/react-wire'
import type { Theme } from '@repo/shared/types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import * as store from '@/store'

export type TThemeSwitcherViewModel = {
    theme: Theme
    setTheme: Dispatch<SetStateAction<Theme>>
    isMounted: boolean
    setIsMounted: Dispatch<SetStateAction<boolean>>
    applyTheme: (newTheme: Theme) => void
    toggleTheme: (newTheme: Theme) => void
    isSidebarExpanded: boolean
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>
}

const useThemeSwitcherViewModel = (): TThemeSwitcherViewModel => {
    
    const [theme, setTheme] = useWireState(store.theme)
    const [isMounted, setIsMounted] = useState(false)
    const [isSidebarExpanded, setIsSidebarExpanded] = useWireState(store.isSidebarExpanded)
    
    const applyTheme = (newTheme: Theme) => {
        
        if (typeof window === 'undefined') return
        
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const isDark = newTheme === 'dark' || (newTheme === 'system' && prefersDark)
        
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
        
    }
    
    const toggleTheme = (newTheme: Theme) => {
        
        setTheme(newTheme)
        
        if (typeof window !== 'undefined')
            localStorage.setItem('theme', newTheme)
        
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
    
    return {
        
        // Global State
        theme,
        setTheme,
        isSidebarExpanded,
        setIsSidebarExpanded,
        
        // State
        isMounted,
        setIsMounted,
        
        // Methods
        applyTheme,
        toggleTheme,
        
    }
    
}

export default useThemeSwitcherViewModel
