'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import InviteCodeForm from '@/components/InviteCodeForm'

interface ProtectedRouteProps {
    children: ReactNode
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    
    const { firebaseUser, loading, needsInviteCode } = useAuth()
    const router = useRouter()
    
    useEffect(() => {
        
        if (!loading && !firebaseUser) {
            console.warn('ProtectedRoute#hook redirecting to login')
            router.push('/login')
        }
        
    }, [loading, firebaseUser, router])
    
    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner />
            </div>
        )
    
    if (!firebaseUser)
        return null
    
    // User is authenticated but needs to enter invite code
    if (needsInviteCode)
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <InviteCodeForm />
            </div>
        )
    
    return children
    
}
