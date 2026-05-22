import { useState } from 'react'

interface CollapsibleTreeProps {
    data: Record<string, unknown> | unknown | unknown[]
    name?: string
    depth?: number
}

const CollapsibleTree = ({
    data,
    name = 'root',
    depth = 0,
}: CollapsibleTreeProps) => {
    
    const [collapsed, setCollapsed] = useState(depth > 0)
    
    const isObject = (val: unknown) => val && typeof val === 'object' && !Array.isArray(val)
    const isArray = (val: unknown) => Array.isArray(val)
    
    if (!isObject(data) && !isArray(data))
        return (
            <div>
                <span style={{ color: '#666' }}>{name}: </span>
                <span style={{ color: '#c43' }}>{JSON.stringify(data)}</span>
            </div>
        )
    
    return (
        
        <div style={{ marginLeft: 16 }}>
            
            <div
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => setCollapsed(x => !x)}>
                <span style={{ color: '#07a' }}>{collapsed ? '▶' : '▼'}</span>
                {name}
                &nbsp;({typeof data})
                &nbsp;({Object.keys(data || {})?.length || '0'})
            </div>
            
            {!collapsed &&
                Object.entries(data || {}).map(([key, val]) => (
                    <CollapsibleTree key={key} data={val} name={key} depth={depth + 1} />
                ))}
        
        </div>
        
    )
    
}

export default CollapsibleTree
