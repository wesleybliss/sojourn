'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/components/providers/AuthProvider'

export default function SignupForm() {

    const router = useRouter()
    const { signInWithGoogle } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleGoogleSignIn = async () => {

        setIsLoading(true)

        try {

            await signInWithGoogle()
            toast.success('Account created successfully!')
            router.push('/')

        } catch (error) {

            console.error('Google sign-in error:', error)

            if (error.code === 'auth/popup-closed-by-user') {
                toast.error('Sign-in cancelled')
            } else if (error.code === 'auth/popup-blocked') {
                toast.error('Popup blocked. Please allow popups for this site.')
            } else {
                toast.error('Failed to create account. Please try again.')
            }

        } finally {

            setIsLoading(false)

        }

    }

    return (

        <Card className="w-full max-w-md">

            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create your account with Google</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <Button
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    type="button"
                >
                    {isLoading ? 'Creating account...' : 'Continue with Google'}
                </Button>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <p>Sign up with your Google account to start planning trips.</p>
                <p>You'll be asked for an invite code after signing in.</p>
            </CardFooter>

        </Card>

    )

}
