import { Outlet } from 'react-router'

import AppShell from '@/components/AppShell'
import Navbar from '@/components/Navbar'

// Optional `children` prop to allow for nested layouts`
export interface AppLayoutProps {
    children?: React.ReactNode
}

const AppLayout = ({
    children,
}: AppLayoutProps) => {
    
    return (
        
        <AppShell>
            <Navbar />
            {children ?? <Outlet />}
        </AppShell>
        
    )
    
}

export default AppLayout
