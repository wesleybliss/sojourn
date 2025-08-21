'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

export default function SignupForm() {
    
    const router = useRouter()
    const { login } = useAuth()
    
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        inviteCode: '',
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
            
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            
            // Handle HTTP errors
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
            }
            
            const result = await response.json()
            
            if (result.success) {
                
                toast.success('Account created successfully!')
                
                // Automatically log in the user after signup
                const loginResponse = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                })
                
                const loginResult = await loginResponse.json()
                
                if (loginResult.success) {
                    login(loginResult.data)
                    router.push('/trips')
                } else {
                    router.push('/login')
                }
                
            } else {
                
                toast.error(result.error || 'Failed to create account')
            }
            
        } catch (error) {
            
            console.error('Signup error:', error)
            // Show toast with error message
            toast.error(error.message || 'An unexpected error occurred')
            
        } finally {
            
            setIsLoading(false)
            
        }
        
    }
    
    return (
        
        <Card className="w-full max-w-md">
            
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account with your email and password</CardDescription>
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
                            placeholder="At least 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="inviteCode">Invite Code</Label>
                        <Input
                            id="inviteCode"
                            name="inviteCode"
                            type="text"
                            placeholder="Enter your invite code"
                            value={formData.inviteCode}
                            onChange={handleChange}
                            required/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                </CardFooter>
            </form>
        
        </Card>
        
    )
    
}
