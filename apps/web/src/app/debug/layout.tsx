import { ReactNode } from 'react'

import DebugSidebar from '@/app/debug/DebugSidebar'

interface DebugLayoutProps {
    children: ReactNode
}

const DebugLayout = ({
    children,
}: DebugLayoutProps) => {
    
    return (
        
        <div className="Debug grid grid-cols-12 gap-4 w-full">
            
            <DebugSidebar className="col-span-2" />
            
            <main className="col-span-10 p-3">
                {children}
            </main>
        
        </div>
        
    )
    
}

export default DebugLayout
