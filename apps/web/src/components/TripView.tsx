'use client'

import TripDetail from '@/components/TripDetail'
import TripEditor from '@/components/TripEditor'
import useTripEditorViewModel from '@/components/TripEditor/useTripEditorViewModel'

const TripView = () => {
    
    const vm = useTripEditorViewModel()
    
    return vm.isTripEditMode
        ? <TripEditor vm={vm} />
        : <TripDetail vm={vm} />
    
}

export default TripView
