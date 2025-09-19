'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
    
    const router = useRouter()
    
    
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    
    const handleChange = e => {
        
        const { name, value } = e.target
        
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
        
    }
    
    const handleSubmit = async e => {
        
        e.preventDefault()
        
        setIsLoading(true)
        
        try {
            
            const res = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            })
            
            if (res?.ok) {
                toast.success('Login successful!')
                router.push('/')
            } else {
                toast.error(res?.error || 'Invalid credentials')
            }
            
        } catch (error) {
            
            console.error('Login error:', error)
            toast.error('An unexpected error occurred')
            
        } finally {
            
            setIsLoading(false)
            
        }
        
    }
    
    return (
        
        <Card className="w-full max-w-md">
            
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Your password"
                            value={formData.password}
                            onChange={handleChange}
                            required/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="show-password"
                            checked={showPassword}
                            onCheckedChange={setShowPassword} />
                        <Label htmlFor="show-password">Show password</Label>
                    </div>
                </CardContent>
                <CardFooter className="mt-4">
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Login'}
                    </Button>
                </CardFooter>
            </form>
        
        </Card>
        
    )
    
}
