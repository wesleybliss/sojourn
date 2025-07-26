
const LoadingSpinner = ({
    centered = true,
} = {}) => {
    
    return (
        
        <div className="flex justify-center items-center">
            <span className="loading loading-ring loading-xl" />
        </div>
        
    )
    
}

export default LoadingSpinner
