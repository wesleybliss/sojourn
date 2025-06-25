import useImportTripsViewModel from './ImportTripsViewModel'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    RadioGroup,
    RadioGroupItem,
} from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
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
                        
                        <p>
                            Conflict resolution strategy:
                        </p>
                        
                        <div className="my-4">
                            
                            <RadioGroup defaultValue={vm.onConflictAction}>
                                
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem
                                        id="r1"
                                        value="duplicate"
                                        onClick={() => vm.setOnConflictAction('duplicate')} />
                                    <Label htmlFor="r1">Duplicate</Label>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem
                                        id="r2"
                                        value="overwrite"
                                        onClick={() => vm.setOnConflictAction('overwrite')} />
                                    <Label htmlFor="r2">Overwrite</Label>
                                </div>
                            
                            </RadioGroup>
                        
                        </div>
                        
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
