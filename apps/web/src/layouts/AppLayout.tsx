import { Outlet } from 'react-router'
import { Toaster } from 'sonner'

import AppShell from '@/components/AppShell'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/components/providers/AuthProvider'
import QueryProvider from '@/components/providers/QueryProvider'

const AppLayout = () => {
    return (
        <AuthProvider>
            <QueryProvider>
                <AppShell>
                    <Navbar />
                    <Outlet />
                </AppShell>
                <Toaster />
            </QueryProvider>
        </AuthProvider>
    )
}

export default AppLayout
