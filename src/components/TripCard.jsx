import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookX } from 'lucide-react'
import dayjs from 'dayjs'

const TripCard = ({
    trip,
    onClick,
    onDeleteTripClick,
}) => {
    
    const { name, description, startDate, endDate } = trip
    
    return (
        
        <Card className="cursor-pointer" onClick={onClick}>
            
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            
            <CardContent>
                {trip.coverImageUrl?.length > 0 ? (
                    <img src={trip.coverImageUrl} />
                ) : (
                    /* Placeholder for header graphic */
                    <div className="bg-gray-200 h-32 w-full mb-4"></div>
                )}
                <p className="text-sm">
                    <strong>Start Date:</strong> {dayjs(startDate).format('MMM DD, YYYY')}
                </p>
                <p className="text-sm">
                    <strong>End Date:</strong> {dayjs(endDate).format('MMM DD, YYYY')}
                </p>
            </CardContent>
            
            <CardFooter>
                <Button
                    variant="outline"
                    onClick={onDeleteTripClick}>
                    <BookX />
                </Button>
            </CardFooter>
        
        </Card>
        
    )
    
}

export default TripCard
