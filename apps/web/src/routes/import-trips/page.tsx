import { FolderUp } from 'lucide-react'
import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useRestoreTrips } from '@/lib/queries/backups'
import { useRouter } from '@/lib/router'

export default function ImportTripsPage() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    
    const [isImporting, setIsImporting] = useState(false)
    const [importStatus, setImportStatus] = useState('')
    const [progressPercent, setProgressPercent] = useState(0)
    
    const startRestoreTrip = () => {
        if (!fileInputRef.current) return
        fileInputRef.current.value = ''
        fileInputRef.current.click()
    }
    
    const restoreMutation = useRestoreTrips()
    
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        
        if (!file) return
        
        setIsImporting(true)
        setImportStatus('Reading file...')
        setProgressPercent(10)
        
        try {
            const text = await file.text()
            const data = JSON.parse(text)
            
            setImportStatus('Uploading backup...')
            setProgressPercent(30)
            
            await restoreMutation.mutateAsync(data)
            
            setImportStatus('Import completed!')
            setProgressPercent(100)
            toast.success('Backup restored successfully')
            
            setTimeout(() => router.push('/trips'), 1500)
            
        } catch (error) {
            console.error('Import error:', error)
            setImportStatus(`Import failed: ${(error as Error).message}`)
            toast.error(`Import failed: ${(error as Error).message}`)
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
                            accept="on"
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
