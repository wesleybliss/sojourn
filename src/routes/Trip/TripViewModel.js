import { useState, useEffect } from 'react'
import { useWireState } from '@forminator/react-wire'
import { useParams } from 'react-router-dom'
import * as store from '@/store'
import * as tripActions from '@/actions/trips'

const useTripViewModel = () => {
    
    const [isEditingName, setIsEditingName] = useState(false)
    
    const [trips, setTrips] = useWireState(store.trips)
    const [currentTrip, setCurrentTrip] = useWireState(store.currentTrip)
    
    const params = useParams()
    const tripId = params.tripId
    
    const updateTrip = field => e => {
        
        console.log('updateTrip', field, e.target.value)
        
        tripActions.updateTrip({
            id: currentTrip.id,
            [field]: e.target.value,
        })
        
    }
    
    const updateSegment = (id, field) => e => {
        
        console.log('updateSegment', field, e.target.value)
        
        tripActions.updateSegment(currentTrip.id, {
            id,
            [field]: e.target.value,
        })
        
    }
    
    useEffect(() => {
        
        const trip = trips.find(it => it.id === tripId)
        
        if (!trip)
            window.location.replace('/')
        
        setCurrentTrip(trip)
        
    }, [tripId, trips])
    
    return {
        
        // State
        isEditingName,
        setIsEditingName,
        
        // Global State
        trips,
        setTrips,
        currentTrip,
        setCurrentTrip,
        
        // Actions
        ...tripActions,
        updateTrip,
        updateSegment,
        
    }
    
}

export default useTripViewModel
