'use client'
/* eslint-disable @stylistic/max-len */

import { cn } from '@repo/shared/utils'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import Sidebar from '@/components/Sidebar'

interface AppShellProps {
    children: ReactNode
}

const CHROMELESS_PATHS = ['/login', '/signup']

const AppShell = ({ children }: AppShellProps) => {
    
    const pathname = usePathname()
    const isChromeless = CHROMELESS_PATHS.some(path => pathname?.startsWith(path))
    const shellBackgroundClassName = [
        'min-h-screen',
        'bg-[radial-gradient(circle_at_top_left,_rgba(221,231,243,0.9),_transparent_38%),linear-gradient(180deg,_var(--surface)_0%,_#eef3f8_100%)]',
        'dark:bg-[radial-gradient(circle_at_top_left,_rgba(42,61,87,0.35),_transparent_35%),linear-gradient(180deg,_#091426_0%,_#0d1728_100%)]',
    ].join(' ')
    
    if (isChromeless)
        return <>{children}</>
    
    return (
        
        <div className={shellBackgroundClassName}>
            <div
                className="mx-auto flex min-h-screen w-full max-w-[1800px] flex-col gap-4 px-3 py-3
                    lg:flex-row lg:px-5 lg:py-5">
                <Sidebar />
                <div
                    className={cn(
                        'app-panel flex min-h-[calc(100vh-1.5rem)] min-w-0 flex-1 flex-col overflow-hidden',
                        'lg:min-h-[calc(100vh-2.5rem)]',
                    )}>
                    {children}
                </div>
            </div>
        </div>
        
    )
    
}

export default AppShell
