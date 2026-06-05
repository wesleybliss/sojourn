import { Defined, Wire } from '@forminator/react-wire'
import { ID, ItemWithId } from '@shared/types/data.types'
import deepmerge from 'deepmerge'

export const addItemObject = (wire: Wire<Record<string, ItemWithId>>, item: ItemWithId) =>
    wire.setValue({
        ...wire.getValue(),
        [item.id]: item,
    })

export const addItemArray = <T extends ItemWithId>(wire: Wire<T[] | null>, item: T) =>
    wire.setValue([
        ...(wire.getValue() || []),
        item,
    ])

export const removeItemObject = (wire: Wire<Record<string, ItemWithId>>, item: ItemWithId) =>
    wire.setValue({
        ...wire.getValue(),
        [item.id]: undefined,
    })

export const removeItemArray = (wire: Wire<ItemWithId[]>, item: ItemWithId) =>
    wire.setValue(
        wire.getValue().filter(i => i.id !== item.id),
    )

export const updateItemObject = (wire: Wire<Record<string, ItemWithId>>, item: ItemWithId) => {
    
    const prev = wire.getValue()
    
    wire.setValue({
        ...prev,
        [item.id]: deepmerge((prev[item.id] || {}), item),
    })
    
}

export const updateItemArray = <T extends { id: ID }, W extends T[] | null>(
    wire: Wire<W>,
    item: T,
) => {
    
    const prev = wire.getValue() || []
    const index = prev.findIndex(it => it.id === item.id)
    
    if (index === -1) {
        
        // Item not found - append it
        wire.setValue([...prev, item] as Defined<W>)
        
    } else {
        
        // Merge with the existing element (not the entire array)
        // Replace arrays instead of merging them to avoid duplication
        const nextVal = prev.map(it => {
            
            if (it.id === item.id)
                return deepmerge(it, item, {
                    arrayMerge: (_, src) => src,
                })
            
            return it
            
        })
        
        wire.setValue(nextVal as Defined<W>)
        
    }
    
}
