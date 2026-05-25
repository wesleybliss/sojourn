import { useWireValue } from '@forminator/react-wire'
import { Plan, Segment, ShengenData, Trip, User } from '@repo/shared/types'

import { useAuth } from '@/components/providers/AuthProvider'
import useDebug from '@/hooks/useDebug'
import * as store from '@/store'

export type TNavbarViewModel = {
    user: User | null
    currentTrip: Trip | null
    plans: Plan[]
    currentPlan: Plan | null
    segments: Segment[]
    shengenData: ShengenData | null
}

const NavbarViewModel = (): TNavbarViewModel => {
    
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
