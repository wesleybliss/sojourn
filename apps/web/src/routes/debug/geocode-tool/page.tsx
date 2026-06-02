import { Button } from '@/components/ui/button'
import useDebugViewModel from '@/routes/debug/useDebugViewModel'

const DebugGeocodeTool = () => {
    
    const vm = useDebugViewModel()
    
    return (
        
        <div className="mt-5">
            
            <h2>Geocode Missing Coordinates</h2>
            
            <div>
                <Button
                    variant="outline"
                    disabled={vm.isLoadingGeocode}
                    onClick={vm.geocodeMissingCoords}>
                    {vm.isLoadingGeocode ? 'Geocoding...' : 'Geocode Missing Coords'}
                </Button>
            </div>
            
            {vm.geocodeResult && (
                <div className="mt-4 p-4 border rounded">
                    <h3>Geocode Result:</h3>
                    <pre className="text-sm bg-gray-100 p-2 rounded mt-2">
                        {JSON.stringify(vm.geocodeResult, null, 2)}
                    </pre>
                </div>
            )}
        
        </div>
        
    )
    
}

export default DebugGeocodeTool