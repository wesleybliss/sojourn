'use client'

import { useEffect } from 'react'
import { useWireValue } from '@forminator/react-wire'
import * as store from '@/store'
import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const CurrentPlanSelector = () => {
    
    const router = useRouter()
    
    const currentTrip = useWireValue(store.currentTrip)
    const currentPlans = useWireValue(store.currentPlans)
    const currentPlan = useWireValue(store.currentPlan)
    
    useEffect(() => {
        if (currentPlan)
            console.log('plan changed:', currentPlan.name)
    }, [currentPlan])
    
    if (!currentPlans || !currentPlan)
        return null
    
    return (
        
        <Select
            value={currentPlan.id.toString()}
            onValueChange={e => {
                // store.currentPlanId.setValue(e)
                router.push(`/trips/${currentTrip?.id}/plans/${e}`)
            }}>
            
            <SelectTrigger className="w-45">
                <SelectValue placeholder={currentPlan.name} />
            </SelectTrigger>
            
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Plans</SelectLabel>
                    {currentPlans.map(it => (
                        <SelectItem key={it.id} value={it.id.toString()}>
                            {it.name}
                        </SelectItem>
                    ))}
                    {/* <SelectLabel><hr /></SelectLabel>
                    <SelectItem
                        value="action:create-new-plan"
                        onClick={() => {
                            console.log('new plan clicked')
                            // open modal, etc.
                        }}>
                        <ListPlus />
                        New Plan
                    </SelectItem> */}
                </SelectGroup>
            </SelectContent>
        
        </Select>
        
    )
    
}

export default CurrentPlanSelector
