import { cn } from '@repo/shared/utils'

interface LoadingSpinnerProps {
    centered?: boolean
}

const LoadingSpinner = ({
    centered = true,
}: LoadingSpinnerProps) => {
    
    return (
        
        <div className={cn('flex justify-center items-center', {
            'min-h-[50vh] w-full': centered,
        })}>
            
            <span className="loading loading-ring loading-xl" />
        
        </div>
        
    )
    
}

export default LoadingSpinner
