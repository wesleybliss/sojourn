import { useRef, useEffect } from 'react'
import { setAbortableTimeout } from '@/lib/utils'

const useAbortableFetch = (fnAsync, dependencies = [], delayMillis = 400) => {
    
    const refAbortController = useRef(new AbortController())
    
    useEffect(() => {
        
        refAbortController.current?.abort()
        refAbortController.current = new AbortController()
        
        setAbortableTimeout(fnAsync, delayMillis, refAbortController.current)
        
    }, dependencies)
    
}

export default useAbortableFetch
