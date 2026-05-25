'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { JSX, ReactNode, useState } from 'react'

const reactQueryDevEnabled = false

export default function QueryProvider({
    children,
}: { children: ReactNode | JSX.Element }) {
    
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
                refetchOnWindowFocus: false,
            },
        },
    }))
    
    return (
        
        <QueryClientProvider client={queryClient}>
            {children}
            {reactQueryDevEnabled && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
        
    )
    
}
