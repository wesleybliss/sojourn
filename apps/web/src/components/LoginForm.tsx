'use client'

import ErrorWithCode from '@repo/shared/errors/ErrorWithCode'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { useAuth } from '@/components/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginForm() {
    
    const router = useRouter()
    const { signInWithGoogle } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    
    const handleGoogleSignIn = async () => {
        
        setIsLoading(true)
        
        try {
            
            await signInWithGoogle()
            toast.success('Login successful!')
            router.push('/')
            
        } catch (e: unknown) {
            
            console.error('Google sign-in error:', e)
            
            if ((e as ErrorWithCode).code === 'auth/popup-closed-by-user') {
                toast.error('Sign-in cancelled')
            } else if ((e as ErrorWithCode).code === 'auth/popup-blocked') {
                toast.error('Popup blocked. Please allow popups for this site.')
            } else {
                toast.error('Failed to sign in. Please try again.')
            }
            
        } finally {
            
            setIsLoading(false)
            
        }
        
    }
    
    return (
        
        <Card className="w-full max-w-md">
            
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Sign in with your Google account</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
                <Button
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    type="button">
                    {isLoading ? 'Signing in...' : 'Continue with Google'}
                </Button>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <p>Sign in with your Google account to access your trips.</p>
            </CardFooter>
        
        </Card>
        
    )
    
}
