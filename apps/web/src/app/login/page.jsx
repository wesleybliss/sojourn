import LoginForm from '@/components/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
    
    return (
        
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            
            <LoginForm />
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                </Link>
            </div>
        
        </div>
        
    )
    
}
