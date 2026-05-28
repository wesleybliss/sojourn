import { useEffect } from 'react'

import { useRouter } from '@/lib/router'

const useConditionalRedirect = (
    observable: unknown,
    conditionFn: () => boolean,
    target: string = '/',
) => {
    
    const router = useRouter()
    
    useEffect(() => {
        
        if (conditionFn())
            router.push(target)
        
    }, [conditionFn, observable, router, target])
    
}

export default useConditionalRedirect
