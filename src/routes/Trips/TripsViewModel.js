import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTrips, createTrip, deleteTrip } from '@/lib/api/serverFunctions'
import dayjs from 'dayjs'

const TripsViewModel = () => {
    
    const {
        data: tripsData,
        error: tripsError,
        isLoading: tripsLoading,
    } = useQuery({
        queryKey: ['trips'],
        queryFn: getTrips,
        enabled: true,
        retry: 0,
    })
    
    const navigate = useNavigate()
    
    const createNewTrip = async () => {
        
        const today = dayjs()
        
        const result = await createTrip({
            name: 'New Trip',
            description: '',
            startDate: today.format('YYYY-MM-DD'),
            endDate: today.add(30, 'day').format('YYYY-MM-DD'),
        })
        
        if (result.success)
            navigate(`/trips/${result.data.id}`)
        else
            console.error('Failed to create trip:', result.error)
        
    }
    
    const deleteTripHandler = async id => {
        
        const result = await deleteTrip(id)
        
        if (!result.success)
            console.error('Failed to delete trip:', result.error)
        
    }
    
    const onDeleteTripClick = id => async e => {
        
        e.preventDefault()
        e.stopPropagation()
        
        // @todo replace with real dialog
        if (!confirm('Are you sure you want to delete this trip?'))
            return
        
        return await deleteTripHandler(id)
        
    }
    
    return {
        
        // Global State
        trips: tripsData?.data || [],
        tripsError,
        tripsLoading,
        
        // Hooks
        navigate,
        
        // Actions
        createNewTrip,
        deleteTrip: deleteTripHandler,
        onDeleteTripClick,
        
    }
    
}

export default TripsViewModel
