import { cn } from '@/lib/utils'

const LoadingSpinner = ({
    centered = true,
} = {}) => {
    
    return (
        
        <div className={cn('flex justify-center items-center', {
            'min-h-[50vh] w-full': centered,
        })}>
            
            <span className="loading loading-ring loading-xl" />
        
        </div>
        
    )
    
}

export default LoadingSpinner
