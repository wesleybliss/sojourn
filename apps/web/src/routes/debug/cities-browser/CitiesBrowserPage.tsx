import { GeonamesCity } from '@repo/shared/types'
import { useMemo, useState } from 'react'

import LoadingSpinner from '@/components/LoadingSpinner'
import { useCitiesQuery } from '@/lib/queries/cities'
import CitiesBrowserPagination from '@/routes/debug/cities-browser/CitiesBrowserPagination'
import { cn } from '@/utils'

const OMIT_FIELDS = ['id', 'createdAt', 'updatedAt']
const ELLIPSE_FIELDS = ['alternateNames']

const getTextValue = (city: GeonamesCity, field: keyof GeonamesCity) => {
    
    const value = city[field]
    const result = typeof value === 'string'
        ? value
        : JSON.stringify(value)
    
    return {
        value: result,
        ellipse: ELLIPSE_FIELDS.includes(field),
    }
    
}

const CitiesBrowserPage = () => {
    
    const [pageIndex, setPageIndex] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    
    const { offset, limit } = useMemo(() => ({
        offset: pageIndex * rowsPerPage,
        limit: rowsPerPage,
    }), [pageIndex, rowsPerPage])
    
    const {
        data,
        isPending,
        isError,
        error,
    } = useCitiesQuery({ offset, limit })
    
    const headers = useMemo(() => (
        Object.keys(data?.cities?.[0] || {})
            .filter(it => !OMIT_FIELDS.includes(it))
    ), [data])
    
    if (isError) return (
        <div>
            <p>Error loading cities</p>
            <pre><code>{JSON.stringify(error, null, 4)}</code></pre>
        </div>
    )
    
    if (isPending) return (
        <LoadingSpinner />
    )
    
    return (
        
        <div className="">
            
            <header className="flex items-center justify-between gap-4">
                <h4>Cities Browser</h4>
            </header>
            
            <div className="mt-3 text-sm italic text-muted-foreground">
                <b>Hidden Fields:</b> {OMIT_FIELDS.join(', ')}
            </div>
            
            <div className="w-full max-w-full mt-4 space-y-4 overflow-x-auto">
                <table className="table-auto text-sm">
                    <thead className="bg-surface-container-low text-left text-xs
                        tracking-[0.18em] text-muted-foreground">
                        <tr>
                            {headers.map(it => (
                                <th
                                    key={`cities-header-${it}`}
                                    className="px-4 py-3 font-medium">
                                    {it}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.cities?.map((it, i) => (
                            <tr key={it.id}>
                                {headers.map(h => {
                                    
                                    const field = getTextValue(it, h as keyof GeonamesCity)
                                    
                                    return (
                                        <td
                                            key={`cities-row-${it.id}-${h}`}
                                            className={cn('px-4 py-3 font-medium', {
                                                'bg-primary/5': i % 2 !== 0,
                                            })}
                                            title={field.ellipse ? field.value : undefined}>
                                            {field.ellipse
                                                ? `${field.value.slice(0, 10)}...`
                                                : field.value}
                                        </td>
                                    )
                                    
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <CitiesBrowserPagination
                    total={data?.total || 0}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage} />
            
            </div>
        
        </div>
        
    )
    
}

export default CitiesBrowserPage
