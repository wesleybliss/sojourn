'use client'

import useNavbarViewModel from './NavbarViewModel'
import { cn } from '@/utils'
import ThemeToggle from '@/components/ThemeToggle'
import AccountMenu from '@/components/AccountMenu'
import CurrentPlanSelector from '@/components/CurrentPlanSelector'
import TripActionsDropdown from '@/components/Navbar/TripActionsDropdown'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const Navbar = () => {
    
    const vm = useNavbarViewModel()
    
    return (
        
        <nav className="flex items-center justify-between px-4 py-2 bg-background border-b">
            
            <div className="flex flex-col lg:flex-row items-center gap-1">
                
                <div className="flex flex-row items-center gap-2 lg:gap-0">
                    
                    <div className="text-sm font-bold opacity-70">
                        <Link href="/">
                            Trip Planner
                        </Link>
                    </div>
                    
                    {vm.currentTrip && (<>
                        
                        <div className="mx-2 text-sm hidden lg:block">/</div>
                        <div className="flex items-center justify-between group text-sm">
                            <Link href={`/trips/${vm.currentTrip?.id}`}>
                                {vm.currentTrip?.name || ''}
                            </Link>
                        </div>
                        
                        <div className="ml-4">
                            <CurrentPlanSelector />
                        </div>
                    
                    </>)}
                
                </div>
                
                <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-0">
                    <Badge className="ml-4" variant="secondary">
                        {vm.segments?.length || '0'} Segments
                    </Badge>
                    
                    {vm.shengenData && (
                        <Badge className="flex items-center gap-2 ml-4" variant="secondary" title="Shengen Allowance">
                            <div>{vm.shengenData?.startDate?.format('MMM D, YYYY')}</div>
                            <div>&rarr;</div>
                            <div className={cn({
                                'text-red-500': vm.shengenData?.isOver === true,
                            })}>
                                {vm.shengenData?.endDate?.format('MMM D, YYYY')}
                            </div>
                            <div className="italic">
                                {vm.shengenData?.totalDays || '0'} days,
                                &nbsp;{vm.shengenData?.remainingDays || '0'} remaining
                            </div>
                        </Badge>
                    )}
                
                </div>
            
            </div>
            
            <div className="flex gap-2 items-center pr-4 lg:pr-0">
                {vm.currentTrip && (
                    <TripActionsDropdown
                        trip={vm.currentTrip}
                        plan={vm.currentPlan} />
                )}
                <ThemeToggle variant="ghost" />
                {vm.user && <AccountMenu />}
            </div>
        
        </nav>
        
    )
    
}

export default Navbar
