import { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/DatePicker'
import { MapPinX } from 'lucide-react'

const SegmentCard = ({
    segment,
    updateSegment,
    deleteSegment,
}) => {
    
    const [isEditingName, setIsEditingName] = useState(false)
    
    return (
        
        <Card className="">
            <CardHeader>
                <CardTitle>
                    {isEditingName ? (
                        <Input
                            type="text"
                            placeholder="New segment"
                            value={segment.name || ''}
                            onChange={updateSegment(segment.id, 'name')}
                            onBlur={() => setIsEditingName(false)}
                            autoFocus />
                    ) : (
                        <span
                            className="cursor-pointer"
                            onDoubleClick={() => setIsEditingName(true)}>
                            {segment.name}
                        </span>
                    )}
                </CardTitle>
                {/* <CardDescription>{segment.description || ''}</CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className="flex gap-4">
                    <Label className="flex flex-col gap-2 items-start">
                        Start
                        <DatePicker date={Date.now()} onSelect={date => console.log(date)} />
                    </Label>
                    <Label className="flex flex-col gap-2 items-start">
                        End
                        <DatePicker date={Date.now()} onSelect={date => console.log(date)} />
                    </Label>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="destructive">
                    <MapPinX />
                </Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
        
    )
    
}

export default SegmentCard
