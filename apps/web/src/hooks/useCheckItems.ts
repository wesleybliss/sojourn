import { ID, ItemWithId } from '@shared/types/data.types'
import { useCallback,useMemo, useState } from 'react'

export type TCheckItems = {
    checked: Set<ID>
    checkedCount: number
    allChecked: boolean
    someChecked: boolean
    anyChecked: boolean
    hasChecked: (idOrIds: (ID | ID[])) => boolean
    setChecked: (idOrIds: (ID | ID[]), override?: boolean) => void
    updateChecked: (fn: (ID[] | ((prev: Set<ID>) => Set<ID>))) => void
    toggleChecked: (idOrIds: (ID | ID[])) => void
    toggleAllChecked: (forceAll?: boolean) => void
}

/**
 * Custom hook to manage the state of checkable items, providing utilities
 * for handling checked items in a list.
 */
const useCheckItems = <T extends ItemWithId>(items: T[]): TCheckItems => {
    
    const [checked, setChecked] = useState<Set<ID>>(new Set())
    
    const checkedCount = checked.size
    
    const allChecked = useMemo(
        () => items.length > 0 && checked.size === items.length,
        [items, checked],
    )
    
    const someChecked = useMemo(
        () => checked.size > 0 && checked.size < items.length,
        [items, checked],
    )
    
    const anyChecked = checked.size > 0
    
    const hasChecked = useCallback((idOrIds: ID | ID[]) => {
        
        if (!Array.isArray(idOrIds))
            return checked.has(idOrIds)
        
        return idOrIds.every(id => checked.has(id))
        
    }, [checked])
    
    const setCheckedManual = useCallback((idOrIds: ID | ID[], override = false) => {
        
        if (Array.isArray(idOrIds)) {
            
            if (override)
                setChecked(new Set(idOrIds))
            else
                setChecked(prev => {
                    const next = new Set(prev)
                    idOrIds.forEach(id => next.add(id))
                    return next
                })
            
        } else {
            
            if (override)
                setChecked(new Set([idOrIds]))
            else
                setChecked(prev => {
                    
                    if (prev.has(idOrIds))
                        return prev
                    
                    const next = new Set(prev)
                    
                    next.add(idOrIds)
                    
                    return next
                })
            
        }
        
    }, [])
    
    /**
     * Convenience method alternative to `setChecked`, where the current `checked`
     * list is passed to an update function (similar to `useState`), removing
     * the need to keep `checked` as a dependency for a `useEffect` hook
     */
    const updateChecked = useCallback((callbackOrNext: ID[] | ((prev: Set<ID>) => Set<ID>)) => {
        
        setChecked(prev =>
            typeof callbackOrNext === 'function'
                ? callbackOrNext(new Set(prev))
                : new Set(callbackOrNext),
        )
        
    }, [])
    
    const toggleChecked = useCallback((idOrIds: ID | ID[]) => {
        
        if (Array.isArray(idOrIds))
            setChecked(prev => {
                const next = new Set(prev)
                idOrIds.forEach(id => next.has(id) ? next.delete(id) : next.add(id))
                return next
            })
        else
            setChecked(prev => {
                const next = new Set(prev)
                if (next.has(idOrIds))
                    next.delete(idOrIds)
                else
                    next.add(idOrIds)
                return next
            })
        
    }, [])
    
    const toggleAllChecked = useCallback((forceAll?: boolean | undefined) => {
        
        if (forceAll === true) {
            setChecked(new Set(items.map(it => it.id)))
        } else if (forceAll === false) {
            setChecked(new Set())
        } else {
            setChecked(prev => {
                const isAllChecked = items.length > 0 && prev.size === items.length
                return isAllChecked
                    ? new Set()
                    : new Set(items.map(it => it.id))
            })
        }
        
    }, [items])
    
    return {
        checked,
        checkedCount,
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
