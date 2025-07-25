'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FolderUp } from 'lucide-react'
import { toast } from 'sonner'

export default function ImportTripsPage() {
    const fileInputRef = useRef()
    const router = useRouter()
    
    const [isImporting, setIsImporting] = useState(false)
    const [importStatus, setImportStatus] = useState('')
    const [progressPercent, setProgressPercent] = useState(0)
    
    const startRestoreTrip = () => {
        fileInputRef.current.value = null
        fileInputRef.current.click()
    }
    
    const handleFileChange = async event => {
        const file = event.target.files[0]
        
        if (!file) return
        
        setIsImporting(true)
        setImportStatus('Reading file...')
        setProgressPercent(10)
        
        try {
            const text = await file.text()
            const data = JSON.parse(text)
            
            setImportStatus('Processing trips...')
            setProgressPercent(30)
            
            // Import trips using the API
            let importedCount = 0
            const totalTrips = Array.isArray(data) ? data.length : (data.trips ? data.trips.length : 1)
            
            const tripsToImport = Array.isArray(data) ? data : (data.trips ? data.trips : [data])
            
            for (const tripData of tripsToImport) {
                setImportStatus(`Importing trip: ${tripData.name || 'Unnamed'}`)
                
                const response = await fetch('/api/trips', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: tripData.name || 'Imported Trip',
                        description: tripData.description || '',
                        startDate: tripData.startDate || null,
                        endDate: tripData.endDate || null,
                        coverImageUrl: tripData.coverImageUrl || null,
                    }),
                })
                
                if (!response.ok) {
                    throw new Error(`Failed to import trip: ${tripData.name}`)
                }
                
                importedCount++
                setProgressPercent(30 + (importedCount / totalTrips) * 60)
            }
            
            setImportStatus('Import completed!')
            setProgressPercent(100)
            
            toast.success(`Successfully imported ${importedCount} trip(s)`)
            
            setTimeout(() => {
                router.push('/trips')
            }, 2000)
            
        } catch (error) {
            console.error('Import error:', error)
            setImportStatus(`Import failed: ${error.message}`)
            toast.error(`Import failed: ${error.message}`)
        } finally {
            setTimeout(() => {
                setIsImporting(false)
                setImportStatus('')
                setProgressPercent(0)
            }, 3000)
        }
    }
    
    return (
        <div className="flex flex-col gap-4 p-8">
            <header className="flex items-center justify-between">
                <h1>Import Trips</h1>
            </header>
            
            <div className="mt-20 w-80 mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Import Trips</CardTitle>
                        <CardDescription>
                            Upload a backup JSON file to import trips.
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        <input
                            ref={fileInputRef}
                            className="hidden"
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}/>
                        
                        <Button
                            className="mt-4"
                            variant="secondary"
                            disabled={isImporting}
                            onClick={startRestoreTrip}>
                            <FolderUp />
                            Select Backup File
                        </Button>
                        
                        {isImporting && (
                            <div className="flex flex-col gap-4 mt-10">
                                <div>{importStatus}</div>
                                <Progress value={progressPercent} className="w-[100%]" />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}