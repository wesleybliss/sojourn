import { migrateTripsToPlans as serverMigrateTripsToPlans } from '@/lib/api/serverFunctions'

const DebugViewModel = () => {
    
    const migrateTripsToPlans = async () => {
        try {
            const result = await serverMigrateTripsToPlans()
            
            if (result.success) {
                console.log('Migration completed:', result.message)
                console.log('Migration results:', result.data)
                return {
                    success: true,
                    message: result.message,
                    data: result.data,
                }
            } else {
                console.error('Migration failed:', result.error)
                return {
                    success: false,
                    error: result.error,
                }
            }
        } catch (error) {
            console.error('Migration error:', error)
            return {
                success: false,
                error: error.message,
            }
        }
    }
    
    return {
        migrateTripsToPlans,
    }
    
}

export default DebugViewModel
