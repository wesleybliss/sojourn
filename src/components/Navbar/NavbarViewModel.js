import { useWireValue } from '@forminator/react-wire'
import * as store from '@/store'
import useDebug from '@/hooks/useDebug'
import { useAuth } from '@/components/providers/AuthProvider'

const NavbarViewModel = () => {
    
    const { user } = useAuth()
    
    const currentTrip = useWireValue(store.currentTrip)
    const plans = useWireValue(store.currentPlans)
    const currentPlan = useWireValue(store.currentPlan)
    const segments = useWireValue(store.currentSegments)
    const shengenData = useWireValue(store.shengenData)
    
    useDebug()
    
    return {
        
        // State
        user,
        currentTrip,
        plans,
        currentPlan,
        segments,
        shengenData,
        
    }
    
}

export default NavbarViewModel
