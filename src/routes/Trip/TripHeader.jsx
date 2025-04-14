import EditableTextField from '@/components/EditableTextField'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/DatePicker'
import { FolderPen, FolderDown } from 'lucide-react'

const TripHeader = ({
    currentTrip,
    updateTrip,
    backupTrip,
}) => {
    
    return (
        
        <header className="flex items-center justify-between gap-4">
            
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-12">
                    <div className="flex items-center justify-between group">
                        <EditableTextField
                            value={currentTrip?.name || ''}
                            placeholder="New trip"
                            onChange={updateTrip('name')}>
                            <FolderPen className="opacity-0 group-hover:opacity-20 hover:opacity-100
                                transition-opacity ease-in-out duration-300" />
                        </EditableTextField>
                    </div>
                    <div className="flex items-center gap-2">
                        <DatePicker
                            date={currentTrip?.startDate || Date.now()}
                            onSelect={updateTrip('startDate')} />
                        <DatePicker
                            date={currentTrip?.endDate || Date.now()}
                            onSelect={updateTrip('endDate')} />
                    </div>
                </div>
                <div className="">
                    <p className="text-muted-foreground">
                        {currentTrip?.description || 'New trip description'}
                    </p>
                </div>
            </div>
            
            <div className="flex items-center justify-end gap-2">
                <Button
                    title="Backup trip"
                    onClick={backupTrip}>
                    <FolderDown />
                </Button>
            </div>
        
        </header>
        
    )
    
}

export default TripHeader
