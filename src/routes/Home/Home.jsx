// import useHomeViewModel from './HomeViewModel'

const Home = () => {
    
    // const vm = useHomeViewModel()
    
    return (
        
        <div className="Home w-full flex flex-col gap-4 p-4">
            
            <h1 className="">
                {process.env.APP_TITLE || 'Trip Planner Basic'}
            </h1>
            
            <div className="">
                <header className="flex items-center justify-between">
                    <h2>
                        Home
                    </h2>
                </header>
            </div>
        
        </div>
        
    )
    
}

export default Home
