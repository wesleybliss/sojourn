import { Outlet } from 'react-router'
import { Toaster } from 'sonner'

import AppShell from '@/components/AppShell'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/components/providers/AuthProvider'
import QueryProvider from '@/components/providers/QueryProvider'
import { TooltipProvider } from '@/components/ui/tooltip'

const AppLayout = () => {
    
    return (
        
        <AuthProvider>
            <QueryProvider>
                <TooltipProvider>
                    
                    <AppShell>
                        <Navbar />
                        <Outlet />
                    </AppShell>
                
                </TooltipProvider>
                <Toaster />
            </QueryProvider>
        </AuthProvider>
        
    )
    
}

export default AppLayout
