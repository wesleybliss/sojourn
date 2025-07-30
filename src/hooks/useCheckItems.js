import { useState, useMemo, useCallback } from 'react'

/**
 * Custom hook to manage the state of checkable items, providing utilities
 * for handling checked items in a list.
 *
 * @param {Array} items - Array of items, each item should have a unique identifier (e.g., an `id`).
 * @returns {Object} - Returns an object containing:
 * @property {Array} checked - List of currently checked item identifiers.
 * @property {boolean} allChecked - Boolean indicating if all items are checked.
 * @property {boolean} someChecked - Boolean indicating if some but not all items are checked.
 * @property {boolean} anyChecked - Boolean indicating if any items are checked (either all or some).
 * @property {function} hasChecked - Function to check if a specific item or list of items are checked.
 * @property {function} setChecked - Function to manually set checked items. Accepts a single item ID
 *                      or an array of IDs. When setting multiple items, it can either override
 *                      the existing checked state or add to it.
 * @property {function} updateChecked - Convenience method to update the `checked` list by passing the
 *                      current `checked` state to an update function.
 * @property {function} toggleChecked - Function to toggle the checked state of a specific item or list of items.
 * @property {function} toggleAllChecked - Function to toggle the checked state of all items. If all items are
 *                      checked, it will uncheck them; if none or some are checked, it will check all.
 *                      Accepts an optional boolean `forceAll` to explicitly set the state to all checked
 *                      or none checked.
 */
const useCheckItems = items => {
    
    const [checked, setChecked] = useState([])
    
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
    
    const hasChecked = useCallback(idOrIds => {
        
        if (!Array.isArray(idOrIds))
            return checked.includes(idOrIds)
        
        return !idOrIds.some(it => !checked.includes(it))
        
    }, [checked])
    
    const setCheckedManual = useCallback((idOrIds, override = false) => {
        
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
    const updateChecked = useCallback(fn => {
        
        setChecked(prev => fn([...prev]))
        
    }, [])
    
    const toggleChecked = useCallback(idOrIds => {
        
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
    
    const toggleAllChecked = useCallback((forceAll = undefined) => {
        
        if (forceAll === true) {
            setChecked(items.map(it => it.id || it))
        } else if (forceAll === false) {
            setChecked([])
        } else {
            if (allChecked)
                setChecked([])
            else
                setChecked(items.map(it => it.id || it))
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
