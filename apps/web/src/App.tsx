import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import * as rwp from 'react-wire-persisted'

import AppRoutes from '@/AppRoutes'
import { AuthProvider } from '@/components/providers/AuthProvider'
import QueryProvider from '@/components/providers/QueryProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import useDebug from '@/hooks/useDebug'

dayjs.extend(advancedFormat)

const App = () => {
    
    rwp.useHydration()
    
    useDebug()
    
    return (
        
        <AuthProvider>
            <QueryProvider>
                <TooltipProvider>
                    
                    <AppRoutes />
                
                </TooltipProvider>
            </QueryProvider>
        </AuthProvider>
        
    )
    
}

export default App
