import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    TableCell,
    TableRow,
} from '@/components/ui/table'
import DatePicker from '@/components/DatePicker'
import ConfirmDialog from '@/components/ConfirmDialog'
import { MoveRight, MapPinX } from 'lucide-react'

const SegmentsTableRow = ({
    segment,
    updateSegment,
    deleteSegment,
}) => {
    
    const [isEditingName, setIsEditingName] = useState(false)
    
    const handleRenameSegment = async e => {
        
        await updateSegment(segment.id, 'name')(e)
        
        setIsEditingName(false)
        
    }
    
    return (
        
        <TableRow>
            
            <div className="flex items-center gap-4">
                
                <TableCell className="font-medium">
                    {isEditingName ? (
                        <Input
                            type="text"
                            placeholder="New segment"
                            value={segment.name || ''}
                            onChange={updateSegment(segment.id, 'name')}
                            onBlur={() => setIsEditingName(false)}
                            onKeyUp={e => e.key === 'Enter' && handleRenameSegment(e)}
                            autoFocus />
                    ) : (
                        <h5
                            className="cursor-pointer"
                            onDoubleClick={() => setIsEditingName(true)}>
                            {segment.name}
                        </h5>
                    )}
                </TableCell>
                
                <TableCell>
                    <div className="flex items-center gap-4">
                        <DatePicker
                            buttonClassName="!p-0 border-b border-secondary rounded-none
                                hover:no-underline hover:border-primary"
                            buttonVariant="link"
                            date={segment.startDate || Date.now()}
                            onSelect={updateSegment(segment.id,'startDate')} />
                        <MoveRight className="opacity-30" />
                        <DatePicker
                            buttonClassName="!p-0 border-b border-secondary rounded-none
                                hover:no-underline hover:border-primary"
                            buttonVariant="link"
                            date={segment.endDate || Date.now()}
                            onSelect={updateSegment(segment.id,'endDate')} />
                        <ConfirmDialog
                            trigger={
                                <Button
                                    className="text-destructive hover:bg-destructive/60 hover:text-primary-foreground"
                                    variant="ghost">
                                    <MapPinX />
                                </Button>
                            }
                            title="Delete Segment"
                            message="Are you sure you want to delete this segment?"
                            cancelLabel="Cancel"
                            onCancel={() => {}}
                            confirmLabel="Delete"
                            onConfirm={() => deleteSegment(segment.id)} />
                    </div>
                </TableCell>
            
            </div>
        
        </TableRow>
        
    )
    
}

export default SegmentsTableRow
