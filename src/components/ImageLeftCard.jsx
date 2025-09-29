import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const LeftImageCard = ({
    imageSrc,
    imageAlt = 'Card image',
    title,
    description,
    children,
    className = '',
    imageClassName = '',
    contentClassName = '',
    maxWidth = 'max-w-2xl',
    height = '',
    imageWidth = 'w-1/3',
    contentWidth = 'w-2/3',
}) => {
    
    return (
        
        <Card className={`flex flex-row py-0 gap-0 ${maxWidth} overflow-hidden ${height || 'min-h-48'} ${className}`}>
            
            {/* Image Section */}
            <div className={`${imageWidth} relative`}>
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className={`w-full h-full object-cover ${imageClassName}`} />
            </div>
            
            {/* Content Section */}
            <div className={`${contentWidth} flex flex-col py-4 ${contentClassName}`}>
                
                {(title || description) && (
                    <CardHeader>
                        {title && <CardTitle>{title}</CardTitle>}
                        {description && <CardDescription>{description}</CardDescription>}
                    </CardHeader>
                )}
                
                {children && (
                    <CardContent className="flex-1">
                        {children}
                    </CardContent>
                )}
            
            </div>
        
        </Card>
        
    )
    
}

export default LeftImageCard

/*
Demo usage component

const App = () => {
    return (
        <div className="w-full p-5">
            <LeftImageCard
                imageSrc="https://picsum.photos/800/600"
                imageAlt="Madrid landscape"
                title="Madrid, ES"
                description={
                    <div className="flex items-center gap-4">
                        January 1st, 2025
                        <div className="flex flex-col justify-center items-center content-center">
                            &rarr;
                        </div>
                        January 20th, 2025
                    </div>
                }>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-2 font-medium">Days</th>
                                <th className="text-left p-2 font-medium">*Days</th>
                                <th className="text-left p-2 font-medium">Flight</th>
                                <th className="text-left p-2 font-medium">Stay</th>
                                <th className="text-left p-2 font-medium">Shengen</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-2">23</td>
                                <td className="p-2">94</td>
                                <td className="p-2">yes</td>
                                <td className="p-2">no</td>
                                <td className="p-2">yes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </LeftImageCard>
        </div>
    )
}

export default App
*/
