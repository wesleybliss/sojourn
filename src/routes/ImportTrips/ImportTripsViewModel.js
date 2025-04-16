import { useRef, useState, useMemo } from 'react'
import { useWireState } from '@forminator/react-wire'
import * as store from '@/store'
import * as actions from '@/actions'
import { toast } from 'sonner'

const ImportTripsViewModel = () => {
    
    const fileInputRef = useRef()
    
    const [pendingImportData, setPendingImportData] = useState(null)
    const [overwriteTripDialogOpen, setOverwriteTripDialogOpen] = useState(false)
    
    const [importTripStatus, setImportTripStatus] = useWireState(store.importTripStatus)
    const [importTripProgressMax, setImportTripProgressMax] = useWireState(store.importTripProgressMax)
    const [importTripProgressValue, setImportTripProgressValue] = useWireState(store.importTripProgressValue)
    
    const isImporting = useMemo(() => importTripStatus?.length > 0, [importTripStatus])
    
    const progressPercent = useMemo(() => {
        
        if (importTripProgressMax <= 0) return 0
        
        return (importTripProgressValue / importTripProgressMax) * 100
        
    }, [importTripProgressMax, importTripProgressValue])
    
    const startRestoreTrip = () => {
        
        fileInputRef.current.value = null
        fileInputRef.current.click()
        
    }
    
    const restoreTripFromBackup = async (data, overwrite = false) => {
        
        console.log('restoreTripFromBackup', { data, overwrite })
        
        try {
            
            await actions.restoreTrip(data, overwrite)
            
        } catch (e) {
            
            if (/already exist/.test(e.message)) {
                console.log('Trip already exists, showing confirm dialog')
                setPendingImportData(data)
                setOverwriteTripDialogOpen(true)
            } else {
                console.error(e)
                toast(e.message)
            }
            
        }
        
        setImportTripStatus(null)
        setImportTripProgressMax(0)
        setImportTripProgressValue(0)
        
    }
    
    const restoreAllTripsFromBackup = async (data, overwrite = false) => {
        
        console.log('restoreAllTripsFromBackup', { data, overwrite })
        
        try {
            
            await actions.restoreAllTrips(data, overwrite)
            
        } catch (e) {
            
            if (/Some(.*)already exist/.test(e.message)) {
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
        
        setOverwriteTripDialogOpen(false)
        
        await restoreTripFromData(pendingImportData, true)
        
        setPendingImportData(null)
        
    }
    
    const handleFileChange = e => {
        
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
        fileInputRef,
        
        // State
        pendingImportData, setPendingImportData,
        overwriteTripDialogOpen, setOverwriteTripDialogOpen,
        
        // Global State
        importTripStatus,
        setImportTripStatus,
        importTripProgressMax,
        setImportTripProgressMax,
        importTripProgressValue,
        setImportTripProgressValue,
        
        // Memos
        isImporting,
        progressPercent,
        
        // Methods
        startRestoreTrip,
        handleFileChange,
        continueRestoreTrip,
        
    }
    
}

export default ImportTripsViewModel
