'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginForm() {
    
    const router = useRouter()
    const { login } = useAuth()
    
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    
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
            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            
            const result = await response.json()
            
            if (result.success) {
                toast.success('Login successful!')
                login(result.data) // Store user in context and localStorage
                router.push('/trips')
            } else {
                toast.error(result.error || 'Failed to login')
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
                            type="password"
                            placeholder="Your password"
                            value={formData.password}
                            onChange={handleChange}
                            required/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Login'}
                    </Button>
                </CardFooter>
            </form>
        
        </Card>
        
    )
    
}
