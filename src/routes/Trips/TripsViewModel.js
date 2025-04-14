import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import tripsRepo from '@/db/repositories/trips'
import * as actions from '@/actions'
import { toast } from 'sonner'
import dayjs from 'dayjs'

const TripsViewModel = () => {
    
    const restoreTripFileRef = useRef()
    
    const [pendingImportData, setPendingImportData] = useState(null)
    const [overwriteTripDialogOpen, setOverwriteTripDialogOpen] = useState(false)
    
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
    
    const startRestoreTrip = () => {
        
        restoreTripFileRef.current.value = null
        restoreTripFileRef.current.click()
        
    }
    
    const restoreTripFromBackup = async (data, overwrite = false) => {
        
        console.log('restoreTripFromBackup', { data, overwrite })
        
        try {
            
            await actions.restoreTrip(data, overwrite)
            
        } catch (e) {
            
            if (e.message === 'Trip already exists') {
                console.log('Trip already exists, showing confirm dialog')
                setPendingImportData(data)
                setOverwriteTripDialogOpen(true)
            } else {
                console.error(e)
                toast(e.message)
            }
            
        }
        
    }
    
    const restoreAllTripsFromBackup = async (data, overwrite = false) => {
        
        console.log('restoreAllTripsFromBackup', { data, overwrite })
        
        try {
            
            await actions.restoreAllTrips(data, overwrite)
            
        } catch (e) {
            
            if (e.message === 'Some trips or segments already exist') {
                setPendingImportData(data)
                setOverwriteTripDialogOpen(true)
            } else {
                console.error(e)
                toast(e.message)
            }
            
        }
        
    }
    
    const restoreTripFromData = async (data, overwrite = false) => {
        
        console.log('restoreTripFromData', data, { overwrite })
        
        switch (data.type) {
            case 'single':
                return await restoreTripFromBackup(data, overwrite)
            case 'multiple':
                return await restoreAllTripsFromBackup(data, overwrite)
            default:
                console.error('Invalid backup type')
                toast('Invalid backup type')
                break
        }
        
    }
    
    const continueRestoreTrip = async () => {
        
        await restoreTripFromData(pendingImportData, true)
        
        setPendingImportData(null)
        setOverwriteTripDialogOpen(false)
        
    }
    
    const restoreTrip = async e => {
        
        const file = e.target.files[0]
        
        if (!file) {
            console.error('No file selected')
            return toast('No file selected')
        }
        
        const reader = new FileReader()
        
        reader.onload = async e => {
            
            try {
                
                await restoreTripFromData(JSON.parse(e.target.result))
                
            } catch (e) {
                
                console.error('Error parsing JSON:', e)
                toast('Error parsing JSON')
                
            }
            
        }
        
        reader.onerror = e => {
            console.error('Error reading file:', e)
            toast('Error reading file')
        }
        
        reader.readAsText(file)
        
    }
    
    return {
        
        // Refs
        restoreTripFileRef,
        
        // State
        pendingImportData,
        setPendingImportData,
        overwriteTripDialogOpen,
        setOverwriteTripDialogOpen,
        
        // Global State
        trips,
        
        // Actions
        createNewTrip,
        startRestoreTrip,
        continueRestoreTrip,
        restoreTrip,
        
    }
    
}

export default TripsViewModel
