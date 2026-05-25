import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useConditionalRedirect = (
    observable: unknown,
    conditionFn: () => boolean,
    target: string = '/',
) => {
    
    const router = useRouter()
    
    useEffect(() => {
        
        if (conditionFn())
            router.push(target)
        
    }, [observable])
    
}

export default useConditionalRedirect
