import useSWR from 'swr'

/**
 * Client hook to fetch trips via SWR from our Next.js API route.
 * @returns {{ trips: any[] | undefined; loading: boolean; error: any }}
 */
export default function useTrips() {
    const fetcher = url => fetch(url).then(res => res.json())
    const { data, error } = useSWR('/api/trips', fetcher)
    
    return { trips: data, loading: !data && !error, error }
}
