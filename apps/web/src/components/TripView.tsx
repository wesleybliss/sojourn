'use client'

import useTripEditorViewModel from '@/components/TripEditor/useTripEditorViewModel'
import TripEditor from '@/components/TripEditor'
import TripDetail from '@/components/TripDetail'

const TripView = () => {
    
    const vm = useTripEditorViewModel()
    
    return vm.isTripEditMode
        ? <TripEditor vm={vm} />
        : <TripDetail vm={vm} />
    
}

export default TripView
