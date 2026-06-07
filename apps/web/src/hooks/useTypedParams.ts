import { useMemo } from 'react'
import { useParams } from 'react-router'
import { z } from 'zod'

export const useTypedParams = <
    T extends z.ZodObject<z.ZodRawShape>,
>(
    schema: T,
): z.infer<T> => {
    
    const params = useParams()
    
    return useMemo(() => {
        
        try {
            
            return schema.parse(params)
            
        } catch (e) {
            
            if (e instanceof z.ZodError)
                throw new Error(`Invalid route params: ${e.message}`)
            
            throw e
            
        }
        
    }, [params])
    
}

export default useTypedParams
