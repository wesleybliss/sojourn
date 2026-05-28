import { fetchJSON } from '@repo/shared/utils/api'
import useSWR from 'swr'

/**
 * Client hook to fetch trips via SWR from our Next API route.
 * @returns {{ trips: any[] | undefined; loading: boolean; error: any }}
 */
export default function useTrips() {
    const fetcher = (url: string) => fetchJSON(url)
    const { data, error } = useSWR('trips', fetcher)
    
    return { trips: data, loading: !data && !error, error }
}
