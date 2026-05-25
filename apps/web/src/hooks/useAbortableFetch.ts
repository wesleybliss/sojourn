import { setAbortableTimeout } from '@repo/shared/utils'
import { useEffect,useRef } from 'react'

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
        
        // eslint-disable-next-line react-compiler/react-compiler
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delayMillis, fnAsync, ...dependencies])
    
}

export default useAbortableFetch
