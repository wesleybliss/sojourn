import Link from 'next/link'

import SignupForm from '@/components/SignupForm'

export default function SignupPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <SignupForm />
            <div className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                    Login
                </Link>
            </div>
        </div>
    )
}