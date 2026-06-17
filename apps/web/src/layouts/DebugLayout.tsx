import { Outlet } from 'react-router'

import DebugSidebar from '@/routes/debug/DebugSidebar'

const DebugLayout = () => {
    
    return (
        
        <div className="Debug w-full flex gap-4 mt-3">
            
            <DebugSidebar />
            
            <main className="p-3">
                <Outlet />
            </main>
        
        </div>
        
    )
    
}

export default DebugLayout
