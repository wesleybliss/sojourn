import { ReactNode, useCallback } from 'react'
import { cn } from '@/utils'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { ID } from '@/types'

const emptyImageSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfF' +
    'cSJAAAADUlEQVR4AWJqaGz8DwAAAP//e4lw8wAAAAZJREFUAwAFkwKEpgq4TgAAAABJRU5ErkJggg=='

interface LeftImageCardProps {
    className?: string
    imageClassName?: string
    wrapperClassName?: string
    headerClassName?: string
    contentClassName?: string
    imageSrc?: string
    imageAlt?: string
    title?: string
    description?: ReactNode
    children?: ReactNode
    maxWidth?: string
    height?: string
    imageWidth?: string
    contentWidth?: string
    placeId?: ID
    shufflePlaceCoverPhoto: (placeId: ID | undefined, topic?: string) => void
}

const LeftImageCard = ({
    className = '',
    imageClassName = '',
    wrapperClassName = 'py-4',
    headerClassName = '',
    contentClassName = '',
    imageSrc,
    imageAlt = 'Card image',
    title,
    description,
    children,
    maxWidth = 'max-w-2xl',
    height = '',
    imageWidth = 'w-1/3',
    contentWidth = 'w-2/3',
    placeId,
    shufflePlaceCoverPhoto,
}: LeftImageCardProps) => {
    
    const shufflePlaceCoverPhotoCustom = useCallback(() => {
        
        const customTopic = prompt('Please enter a custom topic for the image (optional):')
        
        if (!customTopic?.trim()?.length) return
        
        shufflePlaceCoverPhoto(placeId, customTopic)
        
    }, [placeId, shufflePlaceCoverPhoto])
    
    return (
        
        <Card className={`flex flex-row py-0 gap-0 ${maxWidth} overflow-hidden ${height || 'min-h-48'} ${className}`}>
            
            {/* Image Section */}
            <div className={`${imageWidth} relative`}>
                <ContextMenu>
                    <ContextMenuTrigger
                        className="relative">
                        <img
                            className={cn('w-full h-full object-cover', imageClassName, {
                                'min-w-50': !imageSrc,
                            })}
                            src={imageSrc ?? emptyImageSrc}
                            alt={imageAlt} />
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-52">
                        <ContextMenuItem inset onClick={() => shufflePlaceCoverPhoto(placeId, title)}>
                            Shuffle Image
                        </ContextMenuItem>
                        <ContextMenuItem inset onClick={shufflePlaceCoverPhotoCustom}>
                            Shuffle Image (Custom)
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
                {/* <img
                    className={`w-full h-full object-cover ${imageClassName}`}
                    src={imageSrc}
                    alt={imageAlt}
                    onDoubleClick={() => shufflePlaceCoverPhoto(placeId, title)}
                /> */}
            </div>
            
            {/* Content Section */}
            <div className={`${contentWidth} flex flex-col ${wrapperClassName}`}>
                
                {(title || description) && (
                    <CardHeader className={headerClassName || ''}>
                        {title && <CardTitle><h3 className="text-xl">{title}</h3></CardTitle>}
                        {description && <CardDescription>{description}</CardDescription>}
                    </CardHeader>
                )}
                
                {children && (
                    <CardContent className={`flex-1 ${contentClassName || ''}`}>
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
