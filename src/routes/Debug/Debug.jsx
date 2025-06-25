import useDebugViewModel from './DebugViewModel'
import { Button } from '@/components/ui/button'

const Debug = () => {
    
    const vm = useDebugViewModel()
    
    return (
        
        <div className="flex flex-col gap-4 p-8">
            
            <header className="flex items-center justify-between">
                <h1>Debug</h1>
            </header>
            
            <div className="mt-5">
                <h2>Migrate Trips to Plans</h2>
                <div>
                    <Button
                        variant="outline"
                        onClick={vm.migrateTripsToPlans}>
                        Migrate Trips to Plans
                    </Button>
                </div>
            </div>
        
        </div>
        
    )
    
}

export default Debug
