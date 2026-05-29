import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useDebugViewModel from '@/routes/debug/useDebugViewModel'

const DebugPlacesListPage = () => {
    
    const vm = useDebugViewModel()
    
    return (
        
        <div className="DebugPlacesListPage">
            
            <div className="flex flex-col gap-2 max-w-1/2">
                <p>Create Place</p>
                <form className="flex flex-col gap-2" onSubmit={vm.handleCreateNewPlaceSubmit}>
                    <Input name="name" type="text" placeholder="Name" />
                    <Button type="submit" color="primary">
                        Create
                    </Button>
                </form>
            </div>
            
            <div className="flex flex-col gap-2 w-full mt-8">
                
                <p>Places list</p>
                
                {vm.placesError && (
                    <p className="text-error-content">
                        {JSON.stringify(vm.placesError)}
                    </p>
                )}
                
                {vm.placesLoading && <p>Loading...</p>}
                
                {vm.places && (
                    <div className="grid grid-cols-6 gap-2">
                        {vm.places.map(it => (
                            <div key={it.id} className="border rounded">
                                <img src={it.coverImageUrl ?? ''} alt="Place cover image" width="100%" />
                                <p className="w-full p-2 bg-gray-50 text-center">
                                    {it.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            
            </div>
            
            <div className="flex flex-col gap-2 w-90 mt-8">
                
                <p>Places list raw</p>
                
                {vm.placesError && (
                    <p className="text-error-content">
                        {JSON.stringify(vm.placesError)}
                    </p>
                )}
                
                {vm.placesLoading && <p>Loading...</p>}
                
                {vm.places && (
                    <div>
                        <pre>
                            <code>{JSON.stringify(vm.places, null, 4)}</code>
                        </pre>
                    </div>
                )}
            
            </div>
        
        </div>
        
    )
    
}

export default DebugPlacesListPage
