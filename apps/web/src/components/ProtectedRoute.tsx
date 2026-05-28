import { ReactNode, useEffect } from 'react'

import InviteCodeForm from '@/components/InviteCodeForm'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useAuth } from '@/components/providers/AuthProvider'
import { usePathname, useRouter, useSearchParams } from '@/lib/router'

interface ProtectedRouteProps {
    children: ReactNode
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    
    const { firebaseUser, loading, needsInviteCode } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    useEffect(() => {
        
        if (!loading && !firebaseUser) {
            const queryString = searchParams?.toString()
            const returnTo = queryString ? `${pathname}?${queryString}` : pathname
            
            console.warn('ProtectedRoute#hook redirecting to login')
            router.replace(`/login?returnTo=${encodeURIComponent(returnTo || '/')}`)
        }
        
    }, [firebaseUser, loading, pathname, router, searchParams])
    
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
