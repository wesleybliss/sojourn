import { useQuery } from '@tanstack/react-query'
import { useWireState } from '@forminator/react-wire'

const useGlobalStateQuery = (wire, options) => {
    
    const query = useQuery(options)
    const [value, setValue] = useWireState(wire)
    
    return {
        ...query,
        data: value,
        setValue,
    }
    
}

export default useGlobalStateQuery
