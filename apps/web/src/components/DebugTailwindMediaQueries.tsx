
const DebugTailwindMediaQueries = () => {
    
    return (
        
        <div className="flex gap-4 mx-auto">
            
            {/* Stays gray on all screens */}
            <div className="flex flex-col justify-center text-center w-24 h-24 rounded-md bg-gray-400">
                <div>all</div>
            </div>
            
            {/* Turns red from sm breakpoint (640px) and up */}
            <div className="flex flex-col justify-center text-center w-24 h-24 rounded-md bg-gray-400 sm:bg-red-500">
                <div>sm</div>
            </div>
            
            {/* Turns red from md breakpoint (768px) and up */}
            <div className="flex flex-col justify-center text-center w-24 h-24 rounded-md bg-gray-400 md:bg-red-500">
                <div>md</div>
            </div>
            
            {/* Turns red from lg breakpoint (1024px) and up */}
            <div className="flex flex-col justify-center text-center w-24 h-24 rounded-md bg-gray-400 lg:bg-red-500">
                <div>lg</div>
            </div>
            
            {/* Turns red from xl breakpoint (1280px) and up */}
            <div className="flex flex-col justify-center text-center w-24 h-24 rounded-md bg-gray-400 xl:bg-red-500">
                <div>xl</div>
            </div>
            
            {/* Turns red from 2xl breakpoint (1536px) and up */}
            <div className="flex flex-col justify-center text-center w-24 h-24 rounded-md bg-gray-400 2xl:bg-red-500">
                <div>2xl</div>
            </div>
        
        </div>
        
    )
    
}

export default DebugTailwindMediaQueries
