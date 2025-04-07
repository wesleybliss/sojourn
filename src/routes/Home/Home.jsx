import useHomeViewModel from './HomeViewModel'
import { Button } from '@/components/ui/button'
import { FolderPlus, FolderMinus } from 'lucide-react'

const Home = () => {
    
    const vm = useHomeViewModel()
    
    return (
        
        <div className="Home w-full flex flex-col gap-4 p-4">
            
            <h1 className="">
                {process.env.APP_TITLE || 'Trip Planner Basic'}
            </h1>
            
            <div className="">
                <header className="flex items-center justify-between">
                    <h2>
                        Trips
                    </h2>
                    <Button
                        variant="outline"
                        onClick={vm.createNewTrip}>
                        <FolderPlus />
                        New Trip
                    </Button>
                </header>
                <ul>
                    {vm.trips.map(it => (
                        <li key={it.id} className="flex items-center gap-2">
                            <span>{it.name}</span>
                            <Button
                                variant="destructive"
                                onClick={() => vm.deleteTrip(it)}>
                                <FolderMinus />
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        
        </div>
        
    )
    
}

export default Home
