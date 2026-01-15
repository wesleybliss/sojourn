import deepmerge from 'deepmerge'

export const addItemObject = (wire, item) =>
    wire.setValue({
        ...wire.getValue(),
        [item.id]: item,
    })

export const addItemArray = (wire, item) =>
    wire.setValue([
        ...wire.getValue(),
        item,
    ])

export const removeItemObject = (wire, item) =>
    wire.setValue({
        ...wire.getValue(),
        [item.id]: undefined,
    })

export const removeItemArray = (wire, item) =>
    wire.setValue(
        wire.getValue().filter(i => i.id !== item.id),
    )

export const updateItemObject = (wire, item) => {
    
    const prev = wire.getValue()
    
    wire.setValue({
        ...prev,
        [item.id]: deepmerge((prev[item.id] || {}), item),
    })
    
}

export const updateItemArray = (wire, item) => {
    
    const prev = wire.getValue() || []
    const index = prev.findIndex(it => it.id === item.id)
    
    if (index === -1) {
        // Item not found - append it
        wire.setValue([...prev, item])
    } else {
        // Merge with the existing element (not the entire array)
        wire.setValue(prev.map(it => it.id === item.id
            ? deepmerge(it, item)
            : it,
        ))
    }
    
}
