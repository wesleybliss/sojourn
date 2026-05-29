import { Outlet } from 'react-router'

import DebugSidebar from '@/routes/debug/DebugSidebar'

const DebugLayout = () => {
    return (
        <div className="Debug grid w-full grid-cols-12 gap-4">
            <DebugSidebar className="col-span-2" />
            <main className="col-span-10 p-3">
                <Outlet />
            </main>
        </div>
    )
}

export default DebugLayout
