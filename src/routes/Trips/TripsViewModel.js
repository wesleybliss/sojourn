import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import tripsRepo from '@/db/repositories/trips'
import dayjs from 'dayjs'

const TripsViewModel = () => {
    
    const trips = useLiveQuery(() => tripsRepo.getAll())
    
    const navigate = useNavigate()
    
    const createNewTrip = async () => {
        
        const today = dayjs()
        
        const newTripId = await tripsRepo.create({
            name: 'New Trip',
            description: '',
            startDate: today.toDate(),
            endDate: today.add(30, 'day').toDate(),
            segments: [],
        })
        
        navigate(`/trips/${newTripId}`)
        
    }
    
    return {
        
        // Global State
        trips,
        
        // Hooks
        navigate,
        
        // Actions
        createNewTrip,
        
    }
    
}

export default TripsViewModel
