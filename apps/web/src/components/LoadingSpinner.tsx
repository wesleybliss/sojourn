import { cn } from '@repo/shared/utils'

interface LoadingSpinnerProps {
    className?: string
    centered?: boolean
}

const LoadingSpinner = ({
    className,
    centered = true,
}: LoadingSpinnerProps) => {
    
    return (
        
        <div className={cn('flex justify-center items-center', className, {
            'min-h-[50vh] w-full': centered,
        })}>
            
            <span className="loading loading-ring loading-xl" />
        
        </div>
        
    )
    
}

export default LoadingSpinner
