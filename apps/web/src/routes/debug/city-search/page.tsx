import { fetchJSON } from '@repo/shared/utils/api'
import { useCallback, useEffect, useState } from 'react'

import { useAuth } from '@/components/providers/AuthProvider'
import { Input } from '@/components/ui/input'

const DebugCitySearch = () => {
    
    const { loading } = useAuth()
    
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Record<string, unknown>[]>([])
    
    const searchCitiesDebug = useCallback(async (searchQuery: string) => {
        
        try {
            const res = await fetchJSON<Record<string, unknown>[]>(`cities/search?query=${searchQuery}`)
            console.log('res', res)
            setResults(res.data || [])
        } catch (e) {
            console.error(e)
            setResults([])
        }
        
    }, [])
    
    useEffect(() => {
        
        if (!query?.length) return
        
        const t = setTimeout(() => searchCitiesDebug(query), 500)
        
        return () => clearTimeout(t)
        
    }, [query, searchCitiesDebug])
    
    if (loading) return (
        <div>Loading...</div>
    )
    
    return (
        
        <div className="">
            
            <header className="flex items-center justify-between gap-4">
                <h4>City Search</h4>
            </header>
            
            <div className="mt-4 space-y-4">
                <div>
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Search cities..."
                        value={query}
                        onKeyUp={e => e.key === 'Escape' && setQuery('')}
                        onChange={e => setQuery(e.target.value)} />
                </div>
                <div>
                    <pre>
                        <code className="text-sm">
                            {JSON.stringify(results, null, 4)}
                        </code>
                    </pre>
                </div>
            </div>
        
        </div>
        
    )
    
}

export default DebugCitySearch
