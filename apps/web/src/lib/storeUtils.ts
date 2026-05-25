import { Wire } from '@forminator/react-wire'
import { ID, ItemWithId } from '@repo/shared/types/data'
import deepmerge from 'deepmerge'

export const addItemObject = (wire: Wire<Record<string, ItemWithId>>, item: ItemWithId) =>
    wire.setValue({
        ...wire.getValue(),
        [item.id]: item,
    })

export const addItemArray = (wire: Wire<unknown[]>, item: unknown[]) =>
    wire.setValue([
        ...wire.getValue(),
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

export const updateItemArray = <T extends { id: ID }>(wire: Wire<T[]>, item: T) => {
    
    const prev = wire.getValue() || []
    const index = prev.findIndex(it => it.id === item.id)
    
    if (index === -1) {
        // Item not found - append it
        wire.setValue([...prev, item])
    } else {
        // Merge with the existing element (not the entire array)
        const nextVal = prev.map(it => it.id === item.id
            ? deepmerge(it, item)
            : it,
        )
        wire.setValue(nextVal as T[])
    }
    
}
