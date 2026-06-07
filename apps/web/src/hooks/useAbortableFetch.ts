import { setAbortableTimeout } from '@repo/shared/utils'
import { useEffect, useRef } from 'react'

const useAbortableFetch = (
    fnAsync: () => void | Promise<void>,
    dependencies: unknown[] = [],
    delayMillis = 400,
) => {
    
    const refAbortController = useRef(new AbortController())
    
    useEffect(() => {
        
        refAbortController.current?.abort()
        refAbortController.current = new AbortController()
        
        setAbortableTimeout(fnAsync, delayMillis, refAbortController.current)
        
    }, [...dependencies])
    
}

export default useAbortableFetch
