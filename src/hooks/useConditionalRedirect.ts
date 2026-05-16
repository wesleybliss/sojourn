import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
