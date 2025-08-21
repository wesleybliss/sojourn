'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function ProtectedRoute({ children }) {
    
    const { user, loading } = useAuth()
    const router = useRouter()
    
    useEffect(() => {
        
        if (!loading && !user)
            router.push('/login')
        
    }, [user, loading, router])
    
    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
        </div>
    )
    
    // If user is not authenticated, redirect to login page
    if (!user) {
        
        // In case useEffect hasn't triggered yet, we can also imperatively redirect
        if (typeof window !== 'undefined')
            router.push('/login')
        
        return null
        
    }
    
    return children
    
}
