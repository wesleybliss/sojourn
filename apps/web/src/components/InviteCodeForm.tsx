'use client'

import { SubmitEventHandler, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/components/providers/AuthProvider'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function InviteCodeForm() {
    
    const { firebaseUser, refreshUser } = useAuth()
    const [inviteCode, setInviteCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const handleSubmit = async (e: SubmitEvent) => {
        
        e.preventDefault()
        
        if (!inviteCode.trim()) {
            toast.error('Please enter an invite code')
            return
        }
        
        setIsLoading(true)
        
        try {
            
            const token = await firebaseUser!.getIdToken()
            
            const response = await fetch('/api/auth/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ inviteCode: inviteCode.trim() }),
            })
            
            const data = await response.json()
            
            if (response.ok) {
                toast.success('Access granted! Welcome to Trip Planner.')
                await refreshUser()
            } else {
                toast.error(data.error || 'Invalid invite code')
            }
            
        } catch (error) {
            
            console.error('Invite code submission error:', error)
            toast.error('An error occurred. Please try again.')
            
        } finally {
            
            setIsLoading(false)
            
        }
        
    }
    
    if (!firebaseUser)
        return <LoadingSpinner />
    
    return (
        
        <Card className="w-full max-w-md">
            
            <CardHeader>
                <CardTitle>Enter Invite Code</CardTitle>
                <CardDescription>
                    This app is currently in beta. Please enter your invite code to continue.
                </CardDescription>
            </CardHeader>
            
            <form onSubmit={e => handleSubmit(e as unknown as SubmitEvent)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="inviteCode">Invite Code</Label>
                        <Input
                            id="inviteCode"
                            name="inviteCode"
                            type="text"
                            placeholder="Enter your invite code"
                            value={inviteCode}
                            onChange={e => setInviteCode(e.target.value)}
                            required
                            autoFocus/>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Signed in as {firebaseUser?.email}
                    </p>
                </CardContent>
                
                <CardFooter>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? 'Verifying...' : 'Submit'}
                    </Button>
                </CardFooter>
            </form>
        
        </Card>
        
    )
    
}
