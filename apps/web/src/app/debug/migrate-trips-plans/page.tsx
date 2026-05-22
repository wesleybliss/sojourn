'use client'

import useDebugViewModel from '@/app/debug/useDebugViewModel'
import { Button } from '@/components/ui/button'

const DebugMigrateTripsToPlans = () => {
    
    const vm = useDebugViewModel()
    
    return (
        
        <div className="mt-5">
            
            <h2>Migrate Trips to Plans</h2>
            
            <div>
                <Button
                    variant="outline"
                    disabled={vm.isLoading}
                    onClick={vm.migrateTripsToPlans}>
                    {vm.isLoading ? 'Migrating...' : 'Migrate Trips to Plans'}
                </Button>
            </div>
            
            {vm.result && (
                <div className="mt-4 p-4 border rounded">
                    <h3>Migration Result:</h3>
                    <pre className="text-sm bg-gray-100 p-2 rounded mt-2">
                        {JSON.stringify(vm.result, null, 2)}
                    </pre>
                </div>
            )}
        
        </div>
        
    )
    
}

export default DebugMigrateTripsToPlans
