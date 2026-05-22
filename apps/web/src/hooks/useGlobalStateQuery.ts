import { DefaultError, DefinedInitialDataOptions, QueryKey, useQuery } from '@tanstack/react-query'
import { useWireState, Wire } from '@forminator/react-wire'

const useGlobalStateQuery = <
    T,
    TQueryFnData = unknown,
    TError = DefaultError, TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    wire: Wire<T>,
    options: DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
    
    const query = useQuery(options)
    const [value, setValue] = useWireState(wire)
    
    return {
        ...query,
        data: value,
        setValue,
    }
    
}

export default useGlobalStateQuery
