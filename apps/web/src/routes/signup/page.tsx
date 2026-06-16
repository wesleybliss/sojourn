import SignupForm from '@/components/SignupForm'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import { Link } from '@/lib/router'

export default function SignupPage() {
    
    return (
        
        <div className="w-full min-h-screen bg-background">
            
            <header className="flex justify-end items-center gap-3 p-3">
                <ThemeSwitcher />
            </header>
            
            <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
                
                <SignupForm />
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </div>
            
            </div>
        
        </div>
        
    )
    
}
