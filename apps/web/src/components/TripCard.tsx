import { Trip } from '@repo/shared/types/database'
import { BookX } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

interface TripCardProps {
    trip: Trip
    onClick: () => void
    onDeleteTripClick: () => void
}

const TripCard = ({
    trip,
    onClick,
    onDeleteTripClick,
}: TripCardProps) => {
    
    const { name, description } = trip
    
    return (
        
        <Card
            className="cursor-pointer"
            data-id={trip.id}
            onClick={onClick}>
            
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            
            <CardContent>
                {(trip.coverImageUrl?.length || 0) > 0 ? (
                    <img src={trip.coverImageUrl!} />
                ) : (
                    /* Placeholder for header graphic */
                    <div className="bg-gray-200 h-32 w-full mb-4"></div>
                )}
                {/* @todo don't delete - need to grab the start & end dates from the trip's plan's segments */}
                {/*<p className="text-sm">
                    <strong>Start Date:</strong> {dayjs(startDate).format('MMM DD, YYYY')}
                </p>
                <p className="text-sm">
                    <strong>End Date:</strong> {dayjs(endDate).format('MMM DD, YYYY')}
                </p>*/}
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
