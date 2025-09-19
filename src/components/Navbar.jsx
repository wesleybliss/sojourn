'use client'

import { useMemo } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import AccountMenu from '@/components/AccountMenu.jsx'
import { useTripQuery } from '@/lib/queries/trip.js'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const Navbar = () => {
    
    const params = useParams()
    const { data: session } = useSession()
    const user = session?.user
    
    const { tripId, planId } = params
    
    const { data: trip, error: tripError, isLoading: tripIsLoading } = useTripQuery(tripId)
    
    const plans = useMemo(() => trip?.plans || [], [trip])
    
    const currentPlan = useMemo(() => {
        // console.log('currentPlan', { plans, planId, trip })
        if (planId) return plans.find(p => p.id.toString() === planId)
        return plans?.[0]
    }, [plans, planId])
    
    const segments = useMemo(() => currentPlan?.segments || [], [currentPlan])
    
    return (
        
        <nav className="flex items-center justify-between px-4 py-2 bg-background border-b">
            
            <div className="flex items-center">
                
                <div className="text-sm font-bold">
                    Trip Planner
                </div>
                
                {trip && (<>
                    <div className="px-2">/</div>
                    <div className="">
                        <p className="text-sm">
                            {trip.name}
                        </p>
                    </div>
                </>)}
            
            </div>
            
            <div className="flex gap-2 items-center">
                {/* {user && (
                    <span className="text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )} */}
                {user && (
                    <div>
                        {/* <Gravatar user={user} /> */}
                        <AccountMenu user={user} />
                    </div>
                )}
                {user && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="text-xs">
                        Logout
                    </Button>
                )}
                <ThemeToggle />
            </div>
        
        </nav>
        
    )
    
}

export default Navbar
