import { Outlet } from 'react-router'

import AppShell from '@/components/AppShell'
import Navbar from '@/components/Navbar'

const AppLayout = () => {
    
    return (
        
        <AppShell>
            <Navbar />
            <Outlet />
        </AppShell>
        
    )
    
}

export default AppLayout
