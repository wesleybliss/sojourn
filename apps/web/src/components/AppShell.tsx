import { cn } from '@repo/shared/utils'
import { Menu } from 'lucide-react'
import { ReactNode } from 'react'

import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { usePathname } from '@/lib/router'

interface AppShellProps {
    children: ReactNode
}

const CHROMELESS_PATHS = ['/login', '/signup']

const AppShell = ({ children }: AppShellProps) => {
    
    const pathname = usePathname()
    const isChromeless = CHROMELESS_PATHS.some(path => pathname?.startsWith(path))
    const shellBackgroundClassName = [
        'min-h-screen',
        'shell-background',
    ].join(' ')
    
    if (isChromeless)
        return <>{children}</>
    
    return (
        
        <div className={shellBackgroundClassName}>
            
            <div className="mx-auto flex min-h-screen w-full flex-col gap-3 p-1 lg:flex-row lg:p-3">
                
                <Sidebar />
                
                <div
                    className={cn(
                        'routes-panel flex min-h-[calc(100vh-1.5rem)] min-w-0 mb-4',
                        'flex-1 flex-col overflow-hidden lg:min-h-[calc(100vh-2.5rem)]',
                    )}>
                    {children}
                </div>
                
                <div className="lg:hidden fixed inset-y-4 right-4 z-20">
                    <Button
                        className="peer rounded-full"
                        variant="outline">
                        <Menu className="size-3"/>
                    </Button>
                    <div className="hidden fixed max-w-[80%] inset-top-4 right-4 peer-focus:block mt-2">
                        <Sidebar isChild />
                    </div>
                </div>
            
            </div>
        
        </div>
        
    )
    
}

export default AppShell
