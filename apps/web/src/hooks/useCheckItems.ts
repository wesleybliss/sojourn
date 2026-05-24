import { useState, useMemo, useCallback } from 'react'
import { ID, ItemWithId } from '@repo/shared/types/data'

export type TCheckItems = {
    checked: ID[]
    allChecked: boolean
    someChecked: boolean
    anyChecked: boolean
    hasChecked: (idOrIds: (ID | ID[])) => boolean
    setChecked: (idOrIds: (ID | ID[]), override?: boolean) => void
    updateChecked: (fn: (ID[] | ((prev: ID[]) => ID[]))) => void
    toggleChecked: (idOrIds: (ID | ID[])) => void
    toggleAllChecked: (forceAll?: boolean) => void
}

/**
 * Custom hook to manage the state of checkable items, providing utilities
 * for handling checked items in a list.
 */
const useCheckItems = <T extends ItemWithId,>(items: T[]): TCheckItems => {
    
    const [checked, setChecked] = useState<ID[]>([])
    
    const allChecked = useMemo(
        () => items.length > 0 && checked.length === items.length,
        [items, checked],
    )
    
    const someChecked = useMemo(
        () => checked.length > 0 && checked.length < items.length,
        [items, checked],
    )
    
    const anyChecked = useMemo(
        () => allChecked || someChecked,
        [allChecked, someChecked],
    )
    
    const hasChecked = useCallback((idOrIds: ID | ID[]) => {
        
        if (!Array.isArray(idOrIds))
            return checked.includes(idOrIds)
        
        return !idOrIds.some(it => !checked.includes(it))
        
    }, [checked])
    
    const setCheckedManual = useCallback((idOrIds: ID | ID[], override = false) => {
        
        if (Array.isArray(idOrIds)) {
            
            if (override)
                setChecked(idOrIds)
            else
                setChecked(prev => idOrIds.reduce((acc, it) => {
                    if (!acc.includes(it))
                        acc.push(it)
                    return acc
                }, prev))
            
        } else {
            
            if (override)
                setChecked([idOrIds])
            else
                setChecked(prev => (
                    prev.includes(idOrIds)
                        ? prev
                        : [...prev, idOrIds]
                ))
            
        }
        
    }, [])
    
    /**
     * Convenience method alternative to `setChecked`, where the current `checked`
     * list is passed to an update function (similar to `useState`), removing
     * the need to keep `checked` as a dependency for a `useEffect` hook
     */
    const updateChecked = useCallback((fn: ID[] | ((prev: ID[]) => ID[])) => {
        
        setChecked(prev =>
            typeof fn === 'function'
                ? fn([...prev])
                : fn
        )
        
    }, [])
    
    const toggleChecked = useCallback((idOrIds: ID | ID[]) => {
        
        if (Array.isArray(idOrIds))
            setChecked(prev => {
                
                let next = [...prev]
                
                idOrIds.forEach(id => {
                    if (next.includes(id))
                        next = next.filter(it => it !== id)
                    else
                        next = [...next, id]
                })
                
                return next
                
            })
        else
            setChecked(prev => {
                
                if (prev.includes(idOrIds))
                    return prev.filter(it => it !== idOrIds)
                else
                    return [...prev, idOrIds]
                
            })
        
    }, [])
    
    const toggleAllChecked = useCallback((forceAll?: boolean | undefined) => {
        
        if (forceAll === true) {
            setChecked(items.map(it => it.id))
        } else if (forceAll === false) {
            setChecked([])
        } else {
            if (allChecked)
                setChecked([])
            else
                setChecked(items.map(it => it.id))
        }
        
    }, [allChecked, items])
    
    return {
        checked,
        allChecked,
        someChecked,
        anyChecked,
        hasChecked,
        setChecked: setCheckedManual,
        updateChecked,
        toggleChecked,
        toggleAllChecked,
    }
    
}

export default useCheckItems
