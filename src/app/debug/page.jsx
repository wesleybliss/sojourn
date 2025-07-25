'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function DebugPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)
    
    const migrateTripsToPlans = async () => {
        setIsLoading(true)
        
        try {
            const response = await fetch('/api/migrate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            
            const result = await response.json()
            
            setResult(result)
            
            if (result.success) {
                console.log('Migration completed:', result.message)
                console.log('Migration results:', result.data)
            } else {
                console.error('Migration failed:', result.error)
            }
        } catch (error) {
            console.error('Migration error:', error)
            setResult({
                success: false,
                error: error.message,
            })
        } finally {
            setIsLoading(false)
        }
    }
    
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
                        disabled={isLoading}
                        onClick={migrateTripsToPlans}>
                        {isLoading ? 'Migrating...' : 'Migrate Trips to Plans'}
                    </Button>
                </div>
                
                {result && (
                    <div className="mt-4 p-4 border rounded">
                        <h3>Migration Result:</h3>
                        <pre className="text-sm bg-gray-100 p-2 rounded mt-2">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}