import LoginForm from '@/components/LoginForm'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import { Link } from '@/lib/router'

export default function LoginPage() {
    
    return (
        
        <div className="w-full min-h-screen bg-background">
            
            <header className="flex justify-end items-center gap-3 p-3">
                <ThemeSwitcher />
            </header>
            
            <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
                
                <LoginForm />
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </div>
            
            </div>
        
        </div>
        
    )
    
}
