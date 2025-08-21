import useImportTripsViewModel from './ImportTripsViewModel'
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

const ImportTrips = () => {
    
    const vm = useImportTripsViewModel()
    
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
                            ref={vm.fileInputRef}
                            className="hidden"
                            type="file"
                            accept=".json"
                            onChange={vm.handleFileChange} />
                        
                        <Button
                            className="mt-4"
                            variant="secondary"
                            disabled={vm.isImporting}
                            onClick={vm.startRestoreTrip}>
                            <FolderUp />
                            Select Backup File
                        </Button>
                        
                        {vm.isImporting && (
                            <div className="flex flex-col gap-4 mt-10">
                                <div>{vm.importTripStatus}</div>
                                <Progress value={vm.progressPercent} className="w-[100%]" />
                            </div>
                        )}
                    
                    </CardContent>
                
                </Card>
            </div>
        
        </div>
        
    )
    
}

export default ImportTrips
