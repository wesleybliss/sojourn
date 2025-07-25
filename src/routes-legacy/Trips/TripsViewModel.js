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
    
    const deleteTrip = async id => {
        
        await tripsRepo.delete(id)
        
    }
    
    const onDeleteTripClick = id => async e => {
        
        e.preventDefault()
        e.stopPropagation()
        
        // @todo replace with real dialog
        if (!confirm('Are you sure you want to delete this trip?'))
            return
        
        return await deleteTrip(id)
        
    }
    
    return {
        
        // Global State
        trips,
        
        // Hooks
        navigate,
        
        // Actions
        createNewTrip,
        deleteTrip,
        onDeleteTripClick,
        
    }
    
}

export default TripsViewModel
