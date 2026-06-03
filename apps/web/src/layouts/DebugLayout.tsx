import { Outlet } from 'react-router'

import DebugSidebar from '@/routes/debug/DebugSidebar'

const DebugLayout = () => {
    
    return (
        
        <div className="Debug grid w-full grid-cols-12 gap-4 mt-3">
            
            <DebugSidebar className="col-span-3" />
            
            <main className="col-span-9 p-3">
                <Outlet />
            </main>
        
        </div>
        
    )
    
}

export default DebugLayout
