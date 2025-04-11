import { useWireValue } from '@forminator/react-wire'
import * as store from '@/store'
import useDebug from '@/hooks/useDebug'
import useTheme from '@/hooks/useTheme'
import useGlobalEvents from '@/hooks/useGlobalEvents'

import Navbar from '@/components/Navbar'
import Home from '@/routes/Home'
import Trips from '@/routes/Trips'
import Trip from '@/routes/Trip'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Content = () => (
    
    <article className="flex flex-col w-full h-screen">
        
        <Routes>
            
            <Route exact path="/" element={<Home />} />
            <Route exact path="/trips" element={<Trips />} />
            <Route path="/trips/:tripId" element={<Trip />} />
        
        </Routes>
    
    </article>
    
)

const App = () => {
    
    const theme = useWireValue(store.theme)
    
    useDebug()
    useTheme()
    useGlobalEvents()
    
    return (
        
        <Router>
            
            <main
                className="App relative flex flex-col w-full h-screen overflow-y-auto scrollbar-minimal"
                data-theme={theme === 'dark' ? 'business' : theme}>
                
                <div className="absolute top-0 hidden w-px h-screen border border-red-500 DEBUG-PAGE-LINE-V left-1/2" />
                <div className="hidden w-screen h-px border border-red-500 DEBUG-PAGE-LINE-H absolute-centered" />
                
                <Navbar />
                <Content />
                
                {/* {Object.keys(dialogs).map(it => {
                    const Component = dialogs[it]
                    return <Component key={`dialog-${it}`} />
                })} */}
            
            </main>
        
        </Router>
        
    )
    
}

export default App
