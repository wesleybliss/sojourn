import { useWireState } from '@forminator/react-wire'
import * as store from '@/store'
import * as tripActions from '@/actions/trips'
import { useNavigate } from 'react-router-dom'

const useHomeViewModel = () => {
    
    const [trips, setTrips] = useWireState(store.trips)
    
    const navigate = useNavigate()
    
    const createNewTrip = () => {
        
        const { id } = tripActions.createTrip({
            name: 'New trip',
        })
        
        navigate(`/trips/${id}`)
        
    }
    
    return {
        
        // State
        trips,
        setTrips,
        
        // Actions
        ...tripActions,
        createNewTrip,
        
    }
    
}

export default useHomeViewModel
