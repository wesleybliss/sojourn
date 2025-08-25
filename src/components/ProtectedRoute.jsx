'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function ProtectedRoute({ children }) {
    
    const { status } = useSession()
    const router = useRouter()
    
    useEffect(() => {
        
        if (status === 'unauthenticated') {
            console.warn('ProtectedRoute#hook redirecting to login')
            router.push('/login')
        }
        
    }, [status, router])
    
    if (status === 'loading')
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner />
            </div>
        )
    
    if (status === 'unauthenticated')
        return null
    
    return children
    
}
