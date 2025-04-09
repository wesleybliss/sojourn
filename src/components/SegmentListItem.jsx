import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/DatePicker'
import ConfirmDialog from '@/components/ConfirmDialog'
import { MoveRight, MapPinX } from 'lucide-react'

const SegmentListItem = ({
    segment,
    updateSegment,
    deleteSegment,
}) => {
    
    const [isEditingName, setIsEditingName] = useState(false)
    
    return (
        
        <div className="flex items-center gap-4">
            
            <div className="flex flex-col gap-2">
                
                <div className="">
                    {isEditingName ? (
                        <Input
                            type="text"
                            placeholder="New segment"
                            value={segment.name || ''}
                            onChange={updateSegment(segment.id, 'name')}
                            onBlur={() => setIsEditingName(false)}
                            autoFocus />
                    ) : (
                        <h5
                            className="cursor-pointer"
                            onDoubleClick={() => setIsEditingName(true)}>
                            {segment.name}
                        </h5>
                    )}
                </div>
                
                <div className="flex items-center gap-4">
                    <DatePicker
                        buttonClassName="!p-0 border-b border-secondary rounded-none
                            hover:no-underline hover:border-primary"
                        buttonVariant="link"
                        date={Date.now()} onSelect={date => console.log(date)} />
                    <MoveRight className="opacity-30" />
                    <DatePicker
                        buttonClassName="!p-0 border-b border-secondary rounded-none
                            hover:no-underline hover:border-primary"
                        buttonVariant="link"
                        date={Date.now()} onSelect={date => console.log(date)} />
                    {/* <Button
                        className="text-destructive hover:bg-destructive/60 hover:text-primary-foreground"
                        variant="ghost"
                        onClick={deleteSegment(segment)}>
                        <MapPinX />
                    </Button> */}
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
            
            </div>
        
        </div>
        
    )
    
}

export default SegmentListItem
